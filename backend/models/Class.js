module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Class', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, unique: true, allowNull: false },
        examEnabled: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
};
