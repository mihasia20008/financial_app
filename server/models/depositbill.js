'use strict';

module.exports = (sequelize, DataTypes) => {
  const DepositBill = sequelize.define('DepositBill', {
    amount: DataTypes.FLOAT,
    rate: DataTypes.FLOAT,
    type: DataTypes.INTEGER,
    term: DataTypes.DATE,
    date: DataTypes.DATE
  }, {});

  return DepositBill;
};