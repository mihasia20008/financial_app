'use strict';

module.exports = (sequelize, DataTypes) => {
  const InOperation = sequelize.define('InOperation', {
    origin: DataTypes.STRING
  }, {});

  return InOperation;
};
