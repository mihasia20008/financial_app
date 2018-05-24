const usersController = require('../controllers').users;
const billsController = require('../controllers').bills;
const operationsController = require('../controllers').operations;
const categoriesController = require('../controllers').categories;

const getTemplate = (path) => {
  switch (path) {
    case '/actions':
      return {title: 'История', headerHidden: false};
    default:
      return {title: 'Главная', headerHidden: true};    
  }
};

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send(getTemplate(req.query.path)));

  app.post('/api/signin', usersController.signin); // Авторизация пользователя
  app.post('/api/signup', usersController.signup); // Регистрация нового пользователя
  app.get('/api/confirm', usersController.confirm); // Подтверждение электронной почты пользователя
  app.post('/api/forgotpassword', usersController.forgotPassword); // Отправка письма со ссылкой для восстановления пароля
  app.post('/api/restorepassword', usersController.restorePassword); // Восстановление пароля
  app.get('/api/checkdata', usersController.checkData); // Проверка существования пользователя с переданными параметрами
  app.get('/api/users/:id', usersController.show);  
  // app.delete('/api/users/:id', usersController.delete);
  // app.put('/api/users/:id', usersController.update);

  // CRUD-операции для сущности Счет
  app.get('/api/bill', billsController.showAll);
  app.post('/api/bill', billsController.create);
  app.put('/api/bill', billsController.update);
  app.delete('/api/bill', billsController.delete);  
  app.get('/api/bill/:id', billsController.showOne);

  // CRUD-операции для сущности Операция
  app.get('/api/operation', operationsController.showAll);
  app.post('/api/operation', operationsController.create);
  // app.put('/api/operation', operationsController.update);
  app.delete('/api/operation', operationsController.delete);  
  app.get('/api/operation/:id', operationsController.showOne);

  // CRUD-операции для сущности Категория
  app.get('/api/category', categoriesController.showAll);
  app.post('/api/category', categoriesController.create);
  app.put('/api/category', categoriesController.update);
  app.delete('/api/category', categoriesController.delete);  
  app.get('/api/category/:id', categoriesController.showOne);
};
