module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Result', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        totalQuestions: { type: DataTypes.INTEGER },
        correctAnswers: { type: DataTypes.INTEGER },
        wrongAnswers: { type: DataTypes.INTEGER },
        marksObtained: { type: DataTypes.FLOAT },
        percentage: { type: DataTypes.FLOAT },
        rank: { type: DataTypes.INTEGER },
        passStatus: { type: DataTypes.BOOLEAN },
        prizeEligibility: { type: DataTypes.BOOLEAN, defaultValue: false }
    });
};
