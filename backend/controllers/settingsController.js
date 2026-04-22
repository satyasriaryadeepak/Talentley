const { Setting } = require('../models');

// Fetch all settings as a key-value object
exports.getSettings = async (req, res) => {
    try {
        const settingsArray = await Setting.findAll();
        // Convert array of objects to a single mapped object { key1: value1, key2: value2 }
        const settingsMap = {};
        settingsArray.forEach(setting => {
            settingsMap[setting.key] = setting.value;
        });
        res.json(settingsMap);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Bulk upsert settings
exports.updateSettings = async (req, res) => {
    try {
        const updates = req.body; // Expecting { key1: value1, key2: value2 }
        
        for (const [key, value] of Object.entries(updates)) {
            // Upsert creates if not exists, updates if exists.
            const existing = await Setting.findByPk(key);
            if (existing) {
                await existing.update({ value });
            } else {
                await Setting.create({ key, value });
            }
        }
        res.json({ message: "Settings updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
