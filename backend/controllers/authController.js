const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Admin, Student, Class } = require('../models');

exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ where: { username } });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: admin.id, username: admin.username, role: 'admin' } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.studentLogin = async (req, res) => {
    try {
        const { studentId, password } = req.body;
        let student = await Student.findOne({ where: { studentId }, include: [Class] });
        
        if (!student) {
            // Auto Register
            const hashedPassword = await bcrypt.hash(password, 10);
            const newStudent = await Student.create({
                studentId,
                password: hashedPassword,
                name: studentId,
                status: true
            });
            student = await Student.findByPk(newStudent.id, { include: [Class] });
        } else {
            // Regular Login
            if (!(await bcrypt.compare(password, student.password))) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        }

        if (!student.status) return res.status(403).json({ message: 'Account deactivated' });

        const token = jwt.sign({ id: student.id, studentId: student.studentId, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: student.id, studentId: student.studentId, name: student.name, class: student.Class?.name, role: 'student' } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.studentRegister = async (req, res) => {
    try {
        const { studentId, name, password } = req.body;

        if (!studentId || !name || !password) {
            return res.status(400).json({ message: 'Student ID, name, and password are required' });
        }

        const existing = await Student.findOne({ where: { studentId } });
        if (existing) {
            return res.status(400).json({ message: 'Student ID is already taken. Please choose a different one.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = await Student.create({
            studentId,
            name,
            password: hashedPassword,
            status: true
        });

        const student = await Student.findByPk(newStudent.id, { include: [Class] });
        const token = jwt.sign(
            { id: student.id, studentId: student.studentId, role: 'student' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            token,
            user: { id: student.id, studentId: student.studentId, name: student.name, class: student.Class?.name, role: 'student' }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.unifiedLogin = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        
        // 1. Try Admin Table
        const admin = await Admin.findOne({ where: { username: identifier } });
        if (admin && (await bcrypt.compare(password, admin.password))) {
            const token = jwt.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return res.json({ 
                token, 
                user: { id: admin.id, username: admin.username, role: 'admin' },
                redirect: '/admin/dashboard'
            });
        }

        // 2. Try Student Table (matches studentId)
        let student = await Student.findOne({ where: { studentId: identifier }, include: [Class] });
        
        if (!student) {
            // Check if they are trying to register as a student with a new ID
            const hashedPassword = await bcrypt.hash(password, 10);
            const newStudent = await Student.create({
                studentId: identifier,
                password: hashedPassword,
                name: identifier,
                status: true
            });
            student = await Student.findByPk(newStudent.id, { include: [Class] });
        } else {
            if (!(await bcrypt.compare(password, student.password))) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        }

        if (!student.status) return res.status(403).json({ message: 'Account deactivated' });

        const token = jwt.sign({ id: student.id, studentId: student.studentId, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ 
            token, 
            user: { id: student.id, studentId: student.studentId, name: student.name, class: student.Class?.name, role: 'student' },
            redirect: '/student'
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

