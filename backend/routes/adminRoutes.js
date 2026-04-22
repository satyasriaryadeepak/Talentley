const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// In a real app, you'd add middleware here to ensure only super admins can create other admins
router.post('/', adminController.createAdmin);
router.get('/', adminController.getAllAdmins);

module.exports = router;
