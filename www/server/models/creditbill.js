'use strict';

module.exports = (sequelize, DataTypes) => {
  const CreditBill = sequelize.define('CreditBill', {
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

  return CreditBill;
};
