'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Bills', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
			name: {
	      type: Sequelize.STRING,
	      allowNull: false
	    },
	    currency: {
	      type: Sequelize.STRING,
	      defaultValue: 'RUB'
	    },
			accumulate: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			type: {
				type: Sequelize.STRING,
				allowNull: false
			},
			value: {
				type: Sequelize.FLOAT,
				allowNull: false
			},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
			userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      }
    }),
  down: queryInterface => queryInterface.dropTable('Bills')
};
