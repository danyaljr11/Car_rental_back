const express = require('express');
const router = express.Router();

// Methods
const { loginAdmin, logoutAdmin } = require('../controllers/userController');
const requireAuth = require('../middlewares/requireAuth');

// POST

router.post('/login',  loginAdmin);

router.post('/logout', requireAuth ,logoutAdmin);

module.exports = router;