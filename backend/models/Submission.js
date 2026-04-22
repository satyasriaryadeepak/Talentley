module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Submission', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        answers: { type: DataTypes.JSON }, // Store student answers as JSON object {questionId: answer}
        submittedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    });
};
