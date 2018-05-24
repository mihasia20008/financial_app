'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('OutOperations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    place: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    OperationId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Operations',
        key: 'id',
        as: 'OperationId',
      },
    },
    CategoryId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Categories',
        key: 'id',
        as: 'CategoryId',
      },
    }
  }),
  down: queryInterface => queryInterface.dropTable('OutOperations')
};
