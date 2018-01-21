'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
		firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
		email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex'
    },
		phone: {
			type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex'
		},
		password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pin: {
      type: DataTypes.STRING,
			allowNull: false,
    },
		currency: {
			type: DataTypes.STRING,
			allowNull: false,
		}
  });

  return User;
};
