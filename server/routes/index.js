const usersController = require('../controllers').users;
const billsController = require('../controllers').bills;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the API!'
  }));

  app.post('/api/bills/new', billsController.create);
  app.get('/api/bills/:id', billsController.show);


  app.post('/api/users/new', usersController.create);
  app.get('/api/users', usersController.show);
  app.post('/api/login', usersController.auth);
};
