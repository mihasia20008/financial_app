'use strict';

module.exports = (sequelize, DataTypes) => {
  const TransOperation = sequelize.define('TransOperation', {
    addressee: DataTypes.STRING
  }, {});

  return TransOperation;
};
