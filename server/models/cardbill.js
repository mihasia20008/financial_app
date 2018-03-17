'use strict';

module.exports = (sequelize, DataTypes) => {
  const CardBill = sequelize.define('CardBill', {
    value: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    accumulate: DataTypes.BOOLEAN,
    number: DataTypes.STRING
  }, {});

  return CardBill;
};
