'use strict';

module.exports = (sequelize, DataTypes) => {
  const OutOperation = sequelize.define('OutOperation', {
    place: DataTypes.STRING
  }, {});

  return OutOperation;
};
