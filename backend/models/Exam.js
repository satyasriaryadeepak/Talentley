module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Exam', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT },
        totalMarks: { type: DataTypes.INTEGER, defaultValue: 100 },
        passingMarks: { type: DataTypes.INTEGER, defaultValue: 40 },
        duration: { type: DataTypes.INTEGER }, // in minutes
        examDate: { type: DataTypes.DATE },
        published: { type: DataTypes.BOOLEAN, defaultValue: false },
        status: { type: DataTypes.BOOLEAN, defaultValue: true },
        instructions: { type: DataTypes.TEXT }
    });
};
