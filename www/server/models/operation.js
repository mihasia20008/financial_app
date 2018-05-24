'use strict';

module.exports = (sequelize, DataTypes) => {
  const Operation = sequelize.define('Operation', {
    amount: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    comment: {
      defaultValue: '',
      type: DataTypes.STRING
    },
    retry: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    type: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});

  return Operation;
};
