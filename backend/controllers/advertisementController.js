const { Advertisement } = require('../models');

// Get all advertisements
exports.getAllAdvertisements = async (req, res) => {
    try {
        const ads = await Advertisement.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json(ads);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create an advertisement
exports.createAdvertisement = async (req, res) => {
    try {
        const { title, description, buttonText, redirectLink, startDate, endDate, status } = req.body;
        
        // Use uploaded file if present, otherwise fallback to req.body.image (in case they still send a URL)
        let imagePath = req.body.image;
        if (req.file) {
            // Construct the path that will be served by express.static
            const host = req.protocol + '://' + req.get('host');
            imagePath = `${host}/uploads/${req.file.filename}`;
        }

        const ad = await Advertisement.create({ 
            title, 
            description, 
            image: imagePath, 
            buttonText, 
            redirectLink, 
            startDate, 
            endDate, 
            status 
        });
        
        res.status(201).json(ad);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an advertisement
exports.deleteAdvertisement = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Advertisement.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.status(204).send("Advertisement deleted");
        } else {
            res.status(404).json({ error: "Advertisement not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
