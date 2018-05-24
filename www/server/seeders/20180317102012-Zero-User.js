'use strict';

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    firstName: 'user',
    lastName: 'default',
    login: 'user-default',
    email: 'test@email.com',
    phone: '9998889988',
    password: 'testuser',
    pin: '0000',
    currency: 0,
    language: 0,
    confirmAccount: true,
    confirmHash: 'testhash',
    createdAt: '2018-03-17',
    updatedAt: '2018-03-17'
  }], {}),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
