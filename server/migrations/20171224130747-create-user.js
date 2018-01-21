'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
      },
			lastName: {
	      type: Sequelize.STRING,
	      allowNull: false
	    },
			firstName: {
	      type: Sequelize.STRING,
	      allowNull: false
	    },
			email: {
	      type: Sequelize.STRING,
				allowNull: false,
				unique: 'compositeIndex'
	    },
			phone: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: 'compositeIndex'
			},
			password: {
	      type: Sequelize.STRING,
	      allowNull: false
			},
			pin: {
				type: Sequelize.STRING,
				allowNull: false
			},
			currency: {
				type: Sequelize.STRING,
				allowNull: false
			},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable('Users')
};
