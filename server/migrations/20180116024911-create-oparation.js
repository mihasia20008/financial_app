'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Oparations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID4
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      amount: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      date: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      comments: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      retry: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
      billId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Bills',
          key: 'id',
          as: 'billId',
        },
      },
      categoryId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Categories',
          key: 'id',
          as: 'userId',
        },
      }
    }),
  down: queryInterface => queryInterface.dropTable('Oparations')
};