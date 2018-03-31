'use strict';

module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define('Bill', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    currency: DataTypes.INTEGER,
    value: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    type: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    accumulate: { 
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    consider: { 
      defaultValue: true,
      type: DataTypes.BOOLEAN
    },
    isArchival: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
  }, {});

  return Bill;
};
