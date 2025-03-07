const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
},
    { timestamps: true }
);

module.exports = new mongoose.model('blog', blogSchema);