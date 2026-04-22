const { Announcement } = require('../models');

// Get all announcements
exports.getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create an announcement
exports.createAnnouncement = async (req, res) => {
    try {
        const { title, content, priority, targetClass, status } = req.body;
        const announcement = await Announcement.create({ title, content, priority, targetClass, status });
        res.status(201).json(announcement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an announcement
exports.deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Announcement.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.status(204).send("Announcement deleted");
        } else {
            res.status(404).json({ error: "Announcement not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
