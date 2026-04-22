const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// In a real app, you'd protect these routes with admin middleware
router.get('/', examController.getAllExams);
router.get('/published', examController.getPublishedExams);
router.get('/:id', examController.getExamById);
router.post('/', examController.createExam);
router.put('/:id', examController.updateExam);
router.delete('/:id', examController.deleteExam);

module.exports = router;
