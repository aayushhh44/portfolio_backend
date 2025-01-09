const express = require('express');
const router = express.Router();

const {createAdmin, adminLogin} = require('../controllers/userController');
const { createBlog, getBlogs } = require('../controllers/blogController');

router.post('/create-admin',createAdmin);
router.post('/admin-login', adminLogin);
router.post('/create-blog', createBlog);
router.get('/get-blogs', getBlogs);


module.exports = router