'use strict';

module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define('Bill', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    currency: DataTypes.INTEGER,
    type: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    }
  }, {});

  return Bill;
};
