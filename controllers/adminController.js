const User = require('../models/accountModel');
const bcrypt = require('bcrypt');

const adminController = {
    getData: async (req, res) => {

        const users = await User.find().lean();
        res.render('admin', { users });
    },
    resetPassword: async (req, res) => {
        //băm mật khẩu và thêm muối
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash("123456", salt); //mặc định là 123456

        //cập nhật trường mật khẩu trong database
        await User.findByIdAndUpdate(
            req.body.userid,
            { password: hashed },
            { new: true }               // Trả về document sau khi cập nhật
        );

        //xóa cookie
        res.clearCookie('username');

        res.status(200).json("Reset password successfully!");
    },
    blockUser: async (req, res) => {
        console.log('test block', req.body);
        const user = await User.findByIdAndUpdate(req.body.userid, {
            block: true,
        })

        if (!user) return res.status(404).json("Error happened");
        else {
            //xóa cookie
            res.clearCookie('username');

            return res.status(200).json("Block user successfully!");
        }
    },
    unblockUser: async (req, res) => {
        const user = await User.findByIdAndUpdate(req.body.userid, {
            block: false,
        })
        if (!user) return res.status(404).json("Error happened");
        else return res.status(200).json("Block user successfully!");
    }
}

module.exports = adminController;