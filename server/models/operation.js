'use strict';

module.exports = (sequelize, DataTypes) => {
  const Operation = sequelize.define('Operation', {
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
    amount: {
      type: DataTypes.FLOAT,
			allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    retry: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    type: {
      type: DataTypes.STRING,
			allowNull: false,
    }
  });

  return Operation;
};
