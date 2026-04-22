module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Advertisement', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING },
        description: { type: DataTypes.TEXT },
        image: { type: DataTypes.STRING },
        buttonText: { type: DataTypes.STRING },
        redirectLink: { type: DataTypes.STRING },
        startDate: { type: DataTypes.DATE },
        endDate: { type: DataTypes.DATE },
        status: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
};
