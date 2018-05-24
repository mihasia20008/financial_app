'use strict';

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    icon: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    color: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    cost: {
      defaultValue: true,
      type: DataTypes.BOOLEAN
    },
    income: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    surely: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    }
  }, {});

  return Category;
};
