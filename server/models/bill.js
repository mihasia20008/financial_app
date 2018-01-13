'use strict';

module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define('Bill', {
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

  Bill.associate = (models) => {
    Bill.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Bill;
};
