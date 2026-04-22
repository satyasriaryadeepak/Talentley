module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Question', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        questionText: { type: DataTypes.TEXT, allowNull: false },
        optionA: { type: DataTypes.STRING, allowNull: false },
        optionB: { type: DataTypes.STRING, allowNull: false },
        optionC: { type: DataTypes.STRING, allowNull: false },
        optionD: { type: DataTypes.STRING, allowNull: false },
        correctOption: { type: DataTypes.STRING, allowNull: false }, // A, B, C, or D
        explanation: { type: DataTypes.TEXT }
    });
};
