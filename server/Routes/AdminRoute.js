const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getCurrentAdmin, logoutAdmin, changePassword } = require('../Controller/AdminController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/me', authMiddleware, getCurrentAdmin);
router.post('/change-password', authMiddleware, changePassword);

module.exports = router;
