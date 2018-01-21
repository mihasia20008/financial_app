const usersController = require('../controllers').users;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the API!'
  }));

	app.get('/api/users', usersController.show);
  app.post('/api/signup', usersController.create);
  app.post('/api/login', usersController.auth);
};
