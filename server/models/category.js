'use strict';

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
			allowNull: false,
    },
    cost: {
      type: DataTypes.BOOLEAN,
			defaultValue: false
    },
    income: {
      type: DataTypes.BOOLEAN,
			defaultValue: false
    }
  });

  return Category;
};
