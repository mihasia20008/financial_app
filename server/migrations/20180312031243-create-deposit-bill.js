'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('DepositBills', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    amount: {
      type: Sequelize.FLOAT
    },
    rate: {
      type: Sequelize.FLOAT
    },
    type: {
      type: Sequelize.INTEGER
    },
    term: {
      type: Sequelize.DATE
    },
    date: {
      type: Sequelize.DATE
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    BillId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Bills',
        key: 'id',
        as: 'BillId',
      },
    }
  }),
  down: queryInterface => queryInterface.dropTable('DepositBills')
};
