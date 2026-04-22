const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.get('/landing', statsController.getLandingStats);

module.exports = router;
