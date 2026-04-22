const { Class, Student } = require('./models');
const { sequelize } = require('./models');
const bcrypt = require('bcryptjs');

async function setupTestData() {
    try {
        await sequelize.authenticate();
        
        let targetClass = await Class.findOne();
        if (!targetClass) {
            targetClass = await Class.create({ name: 'Grade 10' });
            console.log('Created Class: Grade 10');
        } else {
            console.log(`Using existing class: ${targetClass.name}`);
        }

        const hashedPassword = await bcrypt.hash('student123', 10);
        const student = await Student.create({
            studentId: 'STU001',
            name: 'John Doe',
            password: hashedPassword,
            ClassId: targetClass.id,
            status: true
        });

        console.log('STUDENT_CREATED');
        console.log(`Student ID: ${student.studentId}`);
        console.log(`Password: student123`);
        
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

setupTestData();
