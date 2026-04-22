const bcrypt = require('bcryptjs');
const { Admin } = require('../models');

exports.createAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const existingAdmin = await Admin.findOne({ where: { username } });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await Admin.create({ 
            username, 
            password: hashedPassword,
            role: 'admin'
        });

        res.status(201).json({ 
            message: 'Admin created successfully',
            admin: { id: admin.id, username: admin.username, role: admin.role }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll({
            attributes: ['id', 'username', 'role', 'createdAt']
        });
        res.json(admins);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
