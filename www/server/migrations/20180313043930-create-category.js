'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Categories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    icon: {
      allowNull: false,
      type: Sequelize.STRING
    },
    color: {
      allowNull: false,
      type: Sequelize.STRING
    },
    cost: {
      defalutValue: true,
      type: Sequelize.BOOLEAN
    },
    income: {
      defalutValue: false,
      type: Sequelize.BOOLEAN
    },
    surely: {
      defalutValue: false,
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
  down: queryInterface => queryInterface.dropTable('Categories')
};
