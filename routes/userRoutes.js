const express = require('express');
const router = express.Router();

const {createAdmin, adminLogin} = require('../controllers/userController');

router.post('/create-admin',createAdmin);
router.post('/admin-login', adminLogin)


module.exports = router