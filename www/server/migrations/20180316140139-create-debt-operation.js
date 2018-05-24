'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('DebtOperations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    isOut: {
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
    OperationId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Operations',
        key: 'id',
        as: 'OperationId',
      },
    }
  }),
  down: queryInterface => queryInterface.dropTable('DebtOperations')
};
