const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

let sequelize;

if (process.env.DATABASE_URL) {
    // Supabase / PostgreSQL Connection via URL
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
} else if (process.env.DB_DIALECT === 'sqlite') {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: process.env.DB_STORAGE || './database.sqlite',
        logging: false
    });
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false
    });
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Admin = require('./Admin')(sequelize, DataTypes);
db.Student = require('./Student')(sequelize, DataTypes);
db.Class = require('./Class')(sequelize, DataTypes);
db.Exam = require('./Exam')(sequelize, DataTypes);
db.Question = require('./Question')(sequelize, DataTypes);
db.Submission = require('./Submission')(sequelize, DataTypes);
db.Result = require('./Result')(sequelize, DataTypes);
db.Advertisement = require('./Advertisement')(sequelize, DataTypes);
db.Announcement = require('./Announcement')(sequelize, DataTypes);
db.Winner = require('./Winner')(sequelize, DataTypes);
db.Setting = require('./Setting')(sequelize, DataTypes);

// Define Associations
db.Class.hasMany(db.Student);
db.Student.belongsTo(db.Class);

db.Class.hasMany(db.Exam);
db.Exam.belongsTo(db.Class);

db.Exam.hasMany(db.Question);
db.Question.belongsTo(db.Exam);

db.Student.hasMany(db.Submission);
db.Submission.belongsTo(db.Student);

db.Exam.hasMany(db.Submission);
db.Submission.belongsTo(db.Exam);

db.Submission.hasOne(db.Result);
db.Result.belongsTo(db.Submission);

module.exports = db;
