const UserAccount = require('../models/accountModel');
const bcrypt = require('bcrypt');

const authController = {
    register: (req, res) => {
        res.render('register');
    },
    submitRegister: async (req, res) => {
        try {
            console.log(req.body);
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const authInformation = await new UserAccount({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            })
            const user = await authInformation.save();
            res.status(201).json({ "notice": "Tài khoản đã được tạo" });

        } catch (err) {
            res.status(500).json(err);
        }


    },
    login: (req, res) => {
        res.render('login');
    },
    submitLogin: async (req, res) => {
        const user = await UserAccount.findOne({
            username: req.body.username,
        })
        if (!user) return res.status(404).json('Not found username!');

        //kiểm tra admin đã reset password cho tài khoản này chưa
        if (user.resetPassword) return res.status(404).json("reset");

        //kiểm tra admin đã khóa tài khoản này chưa
        if (user.block === true) return res.status(404).json("Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên để mở lại.")

        const validation = await bcrypt.compare(
            req.body.password, user.password
        );

        if (!validation) return res.status(404).json("Wrong password!");
        /**
         * A cookie with the Secure attribute is only sent to the server with an encrypted request over the HTTPS protocol. 
         * It's never sent with unsecured HTTP (except on localhost)
         * Do đó, khi deploy lên cloud thì nên bỏ thuộc tính secure, hoặc nếu vẫn dùng thì sử dụng HTTPS qua nginx ...
         */
        if (user && validation) {
            res.cookie('username', req.body.username, {
                maxAge: 60 * 1000 * 1000,
                httpOnly: true,
                secure: true,
                path: '/',
            })
            return res.status(200).json("Login successfully!")
        }
    },
    logout: async (req, res) => {
        res.clearCookie('username');
        res.redirect('/auth/login');
    },
    resetPassword: (req, res) => {
        res.render('resetPassword');
    },
    resetPasswordAction: async (req, res) => {
        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        const user = await UserAccount.findOneAndUpdate(
            { username: req.body.username, }, {
            password: hashed,
            resetPassword: false,
        });

        res.status(200).json("Thay đổi mật khẩu thành công! Quay lại trang đăng nhập");
    }
}

module.exports = authController;