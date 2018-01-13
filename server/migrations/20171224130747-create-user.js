'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
	      allowNull: false
	    },
			phone: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			password: {
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
