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
      UserId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'UserId',
        },
      },
      BillId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Bills',
          key: 'id',
          as: 'BillId',
        },
      },
      CategoryId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Categories',
          key: 'id',
          as: 'CategoryId',
        },
      }
    }),
  down: queryInterface => queryInterface.dropTable('Oparations')
};