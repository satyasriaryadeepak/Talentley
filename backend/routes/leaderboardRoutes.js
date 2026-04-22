const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

router.get('/top', leaderboardController.getTopResults);
router.get('/', leaderboardController.getFullLeaderboard);

module.exports = router;
