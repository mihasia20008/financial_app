'use strict';

module.exports = (sequelize, DataTypes) => {
  const CashBill = sequelize.define('CashBill', {
    value: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    accumulate: DataTypes.BOOLEAN
  }, {});
  
  return CashBill;
};
