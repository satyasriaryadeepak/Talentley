const express = require('express');
const router = express.Router();
const winnerController = require('../controllers/winnerController');

router.get('/', winnerController.getAllWinners);
router.post('/', winnerController.addWinner);
router.delete('/:id', winnerController.deleteWinner);

module.exports = router;
