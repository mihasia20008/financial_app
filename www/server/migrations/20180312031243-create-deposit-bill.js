'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('DepositBills', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    receiving: { // Дата открытия
      allowNull: false,
      defaultValue: Sequelize.NOW,
      type: Sequelize.DATE
    },
    rate: { // Процентная ставка
      allowNull: false,
      type: Sequelize.FLOAT
    },
    schedule: { // Выплаты (В конце 0, Ежемесячно 1 или Ежеквартально 2)
      type: Sequelize.INTEGER
    },
    term: { // Срок в днях
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
