'use strict';

module.exports = (sequelize, DataTypes) => {
  const CardBill = sequelize.define('CardBill', {
    limit: { 
      allowNull: false,
      type: DataTypes.FLOAT
    },
    number: DataTypes.STRING
  }, {});

  return CardBill;
};
