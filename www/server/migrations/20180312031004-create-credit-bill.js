'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CreditBills', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    receiving: { // Дата получения
      allowNull: false,
      defaultValue: Sequelize.NOW,
      type: Sequelize.DATE
    },
    rate: { // Процентная ставка
      allowNull: false,
      type: Sequelize.FLOAT
    },
    schedule: { // План (Аннуитетный 0 или Дифференцированный 1)
      type: Sequelize.INTEGER
    },
    term: { // Срок в месяцах
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
  down: queryInterface => queryInterface.dropTable('CreditBills')
};
