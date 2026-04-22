module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Announcement', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, allowNull: false },
        content: { type: DataTypes.TEXT },
        priority: { type: DataTypes.STRING, defaultValue: 'normal' }, // low, normal, high, pin
        targetClass: { type: DataTypes.STRING, defaultValue: 'all' },
        status: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
};
