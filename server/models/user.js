'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    },
		phone: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
		currency: {
			type: DataTypes.STRING,
			allowNull: false,
		}
  });

  User.associate = (models) => {
    User.hasMany(models.Bill, {
      foreignKey: 'userId',
      as: 'bill',
    });
  };

  return User;
};
