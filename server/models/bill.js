'use strict';

module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define('Bill', {
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
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'RUB',
    },
		accumulate: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		value: {
			type: DataTypes.FLOAT,
			allowNull: false,
		}
  });

  return Bill;
};
