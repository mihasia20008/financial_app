'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    login: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING
    },
    phone: {
      allowNull: false,
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    pin: {
      type: Sequelize.STRING
    },
    currency: {
      type: Sequelize.INTEGER
    },
    language: {
      type: Sequelize.INTEGER
    },
    confirmAccount: {
      defaultValue: false,
      type: Sequelize.BOOLEAN,
    },
    confirmHash: {
      allowNull: false,
      type: Sequelize.STRING,
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
