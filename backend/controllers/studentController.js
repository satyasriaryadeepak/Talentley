const { Student, Class } = require('../models');

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll({
            include: [{ model: Class, attributes: ['id', 'name'] }]
        });
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
