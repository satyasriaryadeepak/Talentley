const { Winner } = require('../models');

// Fetch all winners
exports.getAllWinners = async (req, res) => {
    try {
        const winners = await Winner.findAll({
            order: [['rank', 'ASC']]
        });
        res.json(winners);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add new winner
exports.addWinner = async (req, res) => {
    try {
        const winner = await Winner.create(req.body);
        res.status(201).json(winner);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete winner
exports.deleteWinner = async (req, res) => {
    try {
        const { id } = req.params;
        await Winner.destroy({ where: { id } });
        res.json({ message: 'Winner removed successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
