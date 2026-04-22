module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Student', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        studentId: { type: DataTypes.STRING, unique: true, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        gender: { type: DataTypes.STRING },
        parentContact: { type: DataTypes.STRING },
        profileImage: { type: DataTypes.STRING },
        status: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
};
