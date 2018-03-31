const usersController = require('../controllers').users;
const billsController = require('../controllers').bills;
const operationsController = require('../controllers').operations;
const categoriesController = require('../controllers').categories;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the API!'
  }));

  app.post('/api/signup', usersController.create);
  app.post('/api/login', usersController.auth);
  app.get('/api/users/:id', usersController.show);  
  // app.delete('/api/users/:id', usersController.delete);
  // app.put('/api/users/:id', usersController.update);

  app.post('/api/bill/update', (req, res) => {
    const { id, value } = req.body;
    billsController.changeBalance(id, +value)
      .then(bill => res.status(202).send(bill))
      .catch(err => res.status(400).send(err.toString()));
  });

  app.get('/api/bill', billsController.showAll);
  app.post('/api/bill', billsController.create);
  app.put('/api/bill', billsController.update);
  app.delete('/api/bill', billsController.delete);  
  app.get('/api/bill/:id', billsController.showOne);

  app.get('/api/operation', operationsController.showAll);
  app.post('/api/operation', operationsController.create);
  // app.put('/api/operation', operationsController.update);
  app.delete('/api/operation', operationsController.delete);  
  app.get('/api/operation/:id', operationsController.showOne);

  app.get('/api/category', categoriesController.showAll);
  app.post('/api/category', categoriesController.create);
  app.put('/api/category', categoriesController.update);
  app.delete('/api/category', categoriesController.delete);  
  app.get('/api/category/:id', categoriesController.showOne);
};
