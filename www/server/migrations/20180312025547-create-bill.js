'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Bills', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: { // Название
      allowNull: false,
      type: Sequelize.STRING
    },
    currency: { // Валюта
      type: Sequelize.INTEGER
    },
    type: { // Тип
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    value: { // Баланс
      allowNull: false,
      type: Sequelize.FLOAT
    },
    accumulate: { // Накопительный?
      defaultValue: false,
      type: Sequelize.BOOLEAN
    },
    consider: { // Учитывать в балансе?
      defaultValue: true,
      type: Sequelize.BOOLEAN
    },
    isArchival: { // Архивный?
      defaultValue: false,
      type: Sequelize.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    UserId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'UserId',
      },
    }
  }),
  down: queryInterface => queryInterface.dropTable('Bills')
};
