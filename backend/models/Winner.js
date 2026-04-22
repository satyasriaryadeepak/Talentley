module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Winner', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        studentName: { type: DataTypes.STRING },
        className: { type: DataTypes.STRING },
        examName: { type: DataTypes.STRING },
        prizeTitle: { type: DataTypes.STRING },
        rank: { type: DataTypes.INTEGER },
        image: { type: DataTypes.STRING },
        score: { type: DataTypes.FLOAT }
    });
};
