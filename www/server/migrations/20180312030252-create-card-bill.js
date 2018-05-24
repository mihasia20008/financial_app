'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CardBills', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    limit: { // Кредитный лимит
      allowNull: false,
      type: Sequelize.FLOAT
    },
    number: { // 4 цифры карты
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
  down: queryInterface => queryInterface.dropTable('CardBills')
};
