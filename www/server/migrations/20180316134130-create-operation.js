'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Operations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    amount: {
      allowNull: false,
      type: Sequelize.FLOAT
    },
    date: {
      allowNull: false,
      type: Sequelize.DATE
    },
    comment: {
      defaultValue: '',
      type: Sequelize.STRING
    },
    retry: {
      defaultValue: false,
      type: Sequelize.BOOLEAN
    },
    type: {
      allowNull: false,
      type: Sequelize.INTEGER
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
    },
    BillId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Bills',
        key: 'id',
        as: 'BillId',
      },
    }
  }),
  down: queryInterface => queryInterface.dropTable('Operations')
};
