const { Result, Submission, Student, Exam } = require('../models');

// Fetch top performers for the landing page or leaderboard
exports.getTopResults = async (req, res) => {
    try {
        // Find top 3 results ordered by percentage/marks
        const topResults = await Result.findAll({
            order: [
                ['percentage', 'DESC'],
                ['marksObtained', 'DESC']
            ],
            limit: 3,
            include: [
                {
                    model: Submission,
                    include: [
                        { model: Student, attributes: ['id', 'name', 'profileImage'] },
                        { model: Exam, attributes: ['id', 'title'] }
                    ]
                }
            ]
        });

        res.json(topResults);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fetch full leaderboard
exports.getFullLeaderboard = async (req, res) => {
    try {
        const results = await Result.findAll({
            order: [
                ['percentage', 'DESC'],
                ['marksObtained', 'DESC']
            ],
            include: [
                {
                    model: Submission,
                    include: [
                        { model: Student, attributes: ['id', 'name', 'profileImage'] },
                        { model: Exam, attributes: ['id', 'title'] }
                    ]
                }
            ]
        });

        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
