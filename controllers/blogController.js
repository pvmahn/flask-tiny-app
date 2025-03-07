const blogSchema = require('../models/blogModel');

var page = undefined;

const blogController = {
    //idea: lưu username vào cookie, khi cần thì lấy ra
    showBlog: async (req, res) => {
        if (!req.cookies.username) {
            res.redirect('/auth/login');
        }

        const blogs = await blogSchema.find().lean();

        const usernameCookie = req.cookies.username;
        //.lean() dùng để giúp cho handlebars có thể hiển thị dữ liệu 

        // tính toán số lượng trang để phân
        const itemsPerPages = 10;
        const numberOfPages = Math.ceil(blogs.length / itemsPerPages);

        //kiểm tra trang
        console.log(page);
        if (!page) {
            res.render('blog', { blogs, usernameCookie, numberOfPages });
        }
        else {
            const start = (page - 1) * itemsPerPages;
            const end = start + itemsPerPages;

            newBlogs = blogs.slice(start, end);
            // console.log(newBlogs);
            // page = undefined;
            res.render('blog', { newBlogs, usernameCookie, numberOfPages, page });
        }

        // console.log(blogs);

    },
    showBlogWithPagination: async (req, res) => {
        page = req.body.page;
        console.log('page', page);
        res.status(200).json('ok!');
    },
    createBlog: async (req, res) => {
        try {
            const blogInformation = await new blogSchema({
                author: req.body.author,
                content: req.body.content,
            });
            const result = await blogInformation.save();
            res.status(201).json({ message: "Bài viết đã được đăng!" });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    editBlog: async (req, res) => {
        const id = req.params.id;
        console.log(id);

        blogSchema.updateOne({ _id: id }, {
            content: req.body.content,
        })
            .then(() => res.status(200).json("Updated successfully!"));
    },

    deleteBlog: async (req, res) => {
        blogSchema.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json("Deleted successfully!"));
    }

}

module.exports = blogController