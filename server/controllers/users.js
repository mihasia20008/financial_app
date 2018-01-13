const User = require('../models').User;

module.exports = {
  create(req, res) {
    return User
      .create({
				lastName: req.body.lastName,
				firstName: req.body.firstName,
				email: req.body.email,
				phone: req.body.phone,
				password: req.body.password,
				currency: req.body.currency
      })
      .then(user => res.status(201).send(user))
      .catch(err => res.status(400).send(err));
  },
	new(req, res) {

	},
	show(req, res) {
		return User.all()
			.then(users => res.status(200).send(users))
			.catch(err => res.status(400).send(err));
	}
};
