'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID4
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cost: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      income: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
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
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'UserId',
        },
      },
    }),
  down: queryInterface => queryInterface.dropTable('Categories')
};