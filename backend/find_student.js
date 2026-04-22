const { Student } = require('./models');
const { sequelize } = require('./models');

async function findStudent() {
    try {
        await sequelize.authenticate();
        const student = await Student.findOne();
        if (student) {
            console.log('STUDENT_FOUND');
            console.log(`Student ID: ${student.studentId}`);
            console.log(`Name: ${student.name}`);
            // Note: Password is hashed, but maybe there's a known one or I can see if it's 'password123'
        } else {
            console.log('NO_STUDENT_FOUND');
        }
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

findStudent();
