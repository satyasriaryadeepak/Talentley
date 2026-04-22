const { Exam, Class } = require('../models');

// Fetch all exams (for admin or landing page)
exports.getAllExams = async (req, res) => {
    try {
        const exams = await Exam.findAll({
            include: [{ model: Class, attributes: ['id', 'name'] }]
        });
        res.json(exams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fetch published exams (for landing page)
exports.getPublishedExams = async (req, res) => {
    try {
        const exams = await Exam.findAll({
            where: { published: true },
            include: [{ model: Class, attributes: ['id', 'name'] }]
        });
        res.json(exams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single exam
exports.getExamById = async (req, res) => {
    try {
        const exam = await Exam.findByPk(req.params.id, {
            include: [{ model: Class, attributes: ['id', 'name'] }]
        });
        if (!exam) return res.status(404).json({ message: 'Exam not found' });
        res.json(exam);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new exam
exports.createExam = async (req, res) => {
    try {
        const { title, description, totalMarks, passingMarks, duration, examDate, published, ClassId, instructions } = req.body;
        const newExam = await Exam.create({
            title, description, totalMarks, passingMarks, duration, examDate, published, ClassId, instructions
        });
        res.status(201).json(newExam);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an exam
exports.updateExam = async (req, res) => {
    try {
        const exam = await Exam.findByPk(req.params.id);
        if (!exam) return res.status(404).json({ message: 'Exam not found' });

        await exam.update(req.body);
        res.json(exam);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete an exam
exports.deleteExam = async (req, res) => {
    try {
        const exam = await Exam.findByPk(req.params.id);
        if (!exam) return res.status(404).json({ message: 'Exam not found' });

        await exam.destroy();
        res.json({ message: 'Exam deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
