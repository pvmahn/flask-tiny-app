const express = require('express');
const router = express.Router()

const blogController = require('../controllers/blogController');

router.get('/', blogController.showBlog);

router.post('/', blogController.showBlogWithPagination);
router.post('/api/posts', blogController.createBlog);

router.put('/api/posts/:id', blogController.editBlog);
router.delete('/api/posts/:id', blogController.deleteBlog);

module.exports = router;