const usersController = require('../controllers').users;
const billsController = require('../controllers').bills;
const categoriesController = require('../controllers').categories;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the API!'
  }));

  app.post('/api/categories/new', categoriesController.create);
  app.get('/api/categories/:id', categoriesController.show);

  app.post('/api/bills/new', billsController.create);
  app.get('/api/bills/:id', billsController.show);
  app.delete('/api/bills/:id', billsController.delete);
  app.put('/api/bills/:id', billsController.update);

  app.post('/api/users/new', usersController.create);
  app.get('/api/users', usersController.show);
  app.post('/api/login', usersController.auth);
};
