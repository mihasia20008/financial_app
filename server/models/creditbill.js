'use strict';

module.exports = (sequelize, DataTypes) => {
  const CreditBill = sequelize.define('CreditBill', {
    amount: DataTypes.FLOAT,
    rate: DataTypes.FLOAT,
    schedule: DataTypes.INTEGER,
    term: DataTypes.DATE
  }, {});

  return CreditBill;
};
