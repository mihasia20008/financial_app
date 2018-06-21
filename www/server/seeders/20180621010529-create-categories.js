'use strict';

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Categories', [
    {
      name: 'Еда',
      icon: '#icon-1',
      color: '#fff',
      createdAt: '2018-03-17',
      updatedAt: '2018-03-17',
      UserId: 1
    },
    {
      name: 'Игры',
      icon: '#icon-2',
      color: '#fff',
      createdAt: '2018-03-17',
      updatedAt: '2018-03-17',
      UserId: 1
    },
    {
      name: 'Развлечения',
      icon: '#icon-3',
      color: '#fff',
      createdAt: '2018-03-17',
      updatedAt: '2018-03-17',
      UserId: 1
    },
    {
      name: 'Подарки',
      icon: '#icon-4',
      color: '#fff',
      createdAt: '2018-03-17',
      updatedAt: '2018-03-17',
      UserId: 1
    },
  ], {}),
  down: queryInterface => queryInterface.bulkDelete('Categories', null, {})
};
