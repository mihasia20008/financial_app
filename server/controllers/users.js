const crypto = require('crypto');
const User = require('../models').user;

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

const saltHashPassword = (password, salt) => sha512(password, salt);

const verificateUser = (userPassword, salt, verificatingPassword) => {
	return saltHashPassword(verificatingPassword, salt).passwordHash === userPassword;
}

const authByPin = (req, res) => {
	User.findById(req.body.id)
		.then(user => {
			console.log(user);
			user.pin = JSON.parse(user.pin);
			return user;
		})
		.then(user => {
			let result = verificateUser(user.pin.passwordHash, user.pin.salt, req.body.password);
			delete user.password, user.pin;
			return {result, user};
		})
		.then(data => {
			data.result ? 
				res.status(200).send(data.user) : 
				res.status(401).send({message: 'Неверный PIN-код.'});
		})
		.catch(err => res.status(400).send(err));
};

const authByPass = (req, res) => {
	const { auth, password, isLogin } = req.body;

	const findUser = isLogin ?
		User.findAll({
			where: {
				login: auth
			}
		}) :
		User.findAll({
			where: {
				email: auth
			}
		});

	findUser 
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
			let result = verificateUser(user.password.passwordHash, user.password.salt, password);
			delete user.dataValues.password;
			delete user.dataValues.pin;
			console.log(user);
			
			return {result, user};
		})
		.then(data => {
			data.result ? 
				res.status(200).send(data.user) : 
				res.status(401).send({message: 'Неверный логин или пароль.'});
		})
		.catch(err => res.status(400).send(err));
};

module.exports = {
  	create(req, res) {
		User
			.create({
				lastName: req.body.lastname,
				firstName: req.body.firstname,
				login: req.body.login,
				email: req.body.email,
				phone: req.body.phone,
				password: JSON.stringify(saltHashPassword(req.body.password, genRandomString(16))),
				pin: JSON.stringify(saltHashPassword(req.body.pin, genRandomString(16))),
				currency: req.body.currency,
				language: req.body.language
			})
			.then(user => {
				delete user.password, user.pin;
				return user;
			})
			.then(user => res.status(201).send(user))
			.catch(err => res.status(400).send(Object.assign(err, {code: '#0001', info: 'Ошибка регистрации пользователя'})));
	},
	auth(req, res) {
		req.body.type === 'pin' ?
			authByPin(req, res) :
			authByPass(req, res);
	},
	show(req, res) {
		User.all()
			.then(users => res.status(200).send(users))
			.catch(err => res.status(400).send(err));
	}
};
