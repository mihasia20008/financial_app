'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    login: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: DataTypes.STRING,
    pin: DataTypes.STRING,
    currency: DataTypes.INTEGER,
    language: DataTypes.INTEGER,
    confirmAccount: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    confirmHash: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {});

  return User;
};
