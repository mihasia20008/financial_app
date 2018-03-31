'use strict';

module.exports = (sequelize, DataTypes) => {
  const DebtOperation = sequelize.define('DebtOperation', {
    isOut: DataTypes.BOOLEAN
  }, {});

  return DebtOperation;
};
