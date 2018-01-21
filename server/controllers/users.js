const crypto = require('crypto');
const User = require('../models').users;
// const Op = require('sequelize').Op;

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 * @returns {number} of length characters
 */
const genRandomString = (length) => {
	return crypto.randomBytes(Math.ceil(length / 2))
		.toString('hex') /** convert to hexadecimal format */
		.slice(0, length);   /** return required number of characters */
};

/**
* hash password with sha512.
* @function
* @param {string} password - List of required fields.
* @param {string} salt - Data to be validated.
* @returns {object} combine salt and password
*/
const sha512 = (password, salt) => {
	let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
	hash.update(password);
	let passwordHash = hash.digest('hex');
	return {
			salt,
			passwordHash
	};
};

const saltHashPassword = (password, salt) => {
	return sha512(password, salt);
}

const verificateUser = (userPassword, salt, verificatingPassword) => {
	console.log(userPassword);
	console.log(saltHashPassword(verificatingPassword, salt).passwordHash);
	return saltHashPassword(verificatingPassword, salt).passwordHash === userPassword;
}

const authByPin = (req, res) => {
	return User.findAll({
		where: {
			id: req.body.id
		}
	})
	.then(user => {
		console.log(user, 'pin');
		if (!user.length) {
			res.status(401).json({message: 'Неверный PIN-код.'})
		}
		user.pin = JSON.parse(user.pin);
		console.log(user);
		res.status(200).send(user);
	})
	// .then(user => {
	// 	let reult = req.body.type === 'pin' ? 
	// 		verificateUser(user.pin.passwordHash, user.pin.salt, req.body.password) :
	// 		verificateUser(user.password.passwordHash, user.password.salt, req.body.password);
	// 	return {result, user};
	// })
	// .then((result, user) => {
	// 	result ? res.status(200).send(user) : res.status(401).send({message: 'Неверный логин или пароль.'})
	// })
};

const authByPass = (req, res) => {
	return User.findAll({
		where: {
			phone: req.body.phone
		}
	})
	.then(user => {
		if (user.length)
			return user[0];
		res.status(401).send({message: 'Неверный логин или пароль.'})
	})
	.then(user => {
		user.password = JSON.parse(user.password);
		return user;
	})
	.then(user => {
		let result = verificateUser(user.password.passwordHash, user.password.salt, req.body.password);
		delete user.password, user.pin;
		return {result, user};
	})
	.then(data => {
		console.log(data);
		data.result ? 
			res.status(200).send(data.user) : 
			res.status(401).send({message: 'Неверный логин или пароль.'});
	})
	.catch(err => res.status(400).send(err));
};

module.exports = {
  create(req, res) {
    return User
      .create({
				lastName: req.body.lastName,
				firstName: req.body.firstName,
				email: req.body.email,
				phone: req.body.phone,
				password: JSON.stringify(saltHashPassword(req.body.password, genRandomString(16))),
				pin: JSON.stringify(saltHashPassword(req.body.pin, genRandomString(16))),
				currency: req.body.currency
			})
			.then(user => {
				delete user.password, user.pin;
				return user;
			})
      .then(user => res.status(201).send(user))
			.catch(err => res.status(400).send(err));
	},
	auth(req, res) {
		return req.body.type === 'pin' ?
			authByPin(req, res) :
			authByPass(req, res);
	},
	show(req, res) {
		return User.all()
			.then(users => res.status(200).send(users))
			.catch(err => res.status(400).send(err));
	}
};
