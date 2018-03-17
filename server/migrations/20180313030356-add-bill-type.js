'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Bills', 'type',
    { 
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    }
  ),
  down: queryInterface => queryInterface.removeColumn('Bills', 'type')
};
