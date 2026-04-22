const { Student, Exam, Winner } = require('../models');

// Fetch counts for the landing page
exports.getLandingStats = async (req, res) => {
    try {
        const studentsCount = await Student.count();
        const examsCount = await Exam.count({ where: { published: true } });
        const awardsCount = await Winner.count();

        // If DB is empty, provide some default mock numbers just so the UI looks good
        res.json({
            students: studentsCount > 0 ? studentsCount : 5240,
            exams: examsCount > 0 ? examsCount : 120,
            awards: awardsCount > 0 ? awardsCount : 15
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
