'use strict';

module.exports = (sequelize, DataTypes) => {
  const DepositBill = sequelize.define('DepositBill', {
    receiving: { 
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    },
    rate: { 
      allowNull: false,
      type: DataTypes.FLOAT
    },
    schedule: { 
      type: DataTypes.INTEGER
    },
    term: { 
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});

  return DepositBill;
};