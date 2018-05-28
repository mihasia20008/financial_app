const User = require('../models').user;
const sendMail = require('../helpers').sendMail;
const hashGenerator = require('../helpers').hashGenerator;

const verificateUser = (userPassword, salt, verificatingPassword) => {
	return hashGenerator(verificatingPassword, salt).passwordHash === userPassword;
}

module.exports = {
	signup(req, res) {
		const confirmData = hashGenerator(req.body.login);
		User
			.create({
				lastName: req.body.lastname,
				firstName: req.body.firstname,
				login: req.body.login,
				email: req.body.email,
				phone: req.body.phone,
				password: JSON.stringify(hashGenerator(req.body.password)),
				pin: JSON.stringify(hashGenerator(req.body.pin)),
				currency: req.body.currency,
				language: req.body.language,
				confirmAccount: false,
				confirmHash: confirmData.passwordHash.substr(0, 16)
			})
			.then(user => new Promise((resolve, reject) => {
				delete user.dataValues.password;
				delete user.dataValues.pin;
				sendMail(
					'confirm',
					req.body.firstname, 
					req.body.email, 
					'Регистрация в приложении EasyCosts',
					req.protocol + '://' + req.get('host') + '/verify?id=' + user.id + '&hash=' + confirmData.passwordHash.substr(0, 16)
				)
				.then(() => resolve(user))
				.catch(err => reject({message: 'Ошибка отправки письма с инструкциями. Обратитесь в службу поддержки.', err}));
			}))
			.then(user => res.status(201).send(user))
			.catch(err => {
				if (typeof err.message !== 'undefined')
					res.status(400).send({message: err.message, err: err.err});
				else
					res.status(400).send(Object.assign(err, {code: '#0001', info: 'Ошибка регистрации пользователя'}));
			});
	},
	signin(req, res) {
		const { auth, password, isLogin } = req.body;

		User.findAll({
			where: {
				[isLogin ? 'login' : 'email']: auth
			}
		}) 
			.then(user => {
				if (user.length)
					return user[0];
				res.status(400).send({message: 'Неверный логин или пароль.'})
			})
			.then(user => {
				user.pin = JSON.parse(user.pin);
				user.password = JSON.parse(user.password);
				return user;
			})
			.then(user => new Promise((resolve, reject) => {
				const isUser = req.body.type === 'pin' ? 
					verificateUser(user.pin.passwordHash, user.pin.salt, password) :
					verificateUser(user.password.passwordHash, user.password.salt, password);
				if (isUser) {
					delete user.dataValues.password;
					delete user.dataValues.pin;
					resolve(user);
				} else reject({message: 'Неверный логин или пароль.'})
			}))
			.then(user => res.status(200).send(user))
			.catch(err => {
				if (typeof err.message !== 'undefined')
					res.status(400).send({message: err.message});
				else
					res.status(400).send({message: 'Пользователь с таким id не найден', err})
			});
	},
	show(req, res) {
		User.all()
			.then(users => res.status(200).send(users))
			.catch(err => res.status(400).send(err));
	},
	confirm(req, res) {
		if (req.query.id === 'null' && req.query.hash === 'null') {
			res.status(400).send({message: 'Переданы ошибочные параметры подтверждения пользователя'});
			return;
		}
		User.findById(req.query.id)
			.then(user => new Promise((resolve, reject) => {
				if (user.confirmAccount) 
					resolve(user);
				else if (user.confirmHash !== req.query.hash) 
					reject({message: 'Ошибка подтверждения учетной записи'});
				else
					resolve(user.update({confirmAccount: true}));
			}))
			.then(user => {
				delete user.dataValues.password;
				delete user.dataValues.pin;
				res.status(200).send(user)
			})
			.catch(err => {
				if (typeof err.message !== 'undefined')
					res.status(400).send({message: err.message});
				else
					res.status(400).send({message: 'Пользователь с таким id не найден', err})
			});
	},
	checkData(req, res) {
		if (req.query.param === 'null' && req.query.value === 'null') {
			res.status(400).send({message: 'Переданы ошибочные параметры запроса'});
			return;
		}
		User.findAll({
			where: {
				[`${req.query.param}`]: req.query.value
			}
		})
			.then(users => res.status(200).send({result: users.length}))
			.catch(() => res.status(200).send({result: 0}));
	},
	forgotPassword(req, res) {
		if (typeof req.body.email === 'undefined') {
			res.status(400).send({message: 'Переданы ошибочные параметры пользователя'});
			return;
		}		
		User.findOne({
			where: {
				email: req.body.email
			}
		})
			.then(user => new Promise((resolve, reject) => {
				const hash = hashGenerator(user.email);
				sendMail(
					'restore',
					user.firstName, 
					user.email, 
					'Восстановление пароля в приложении EasyCosts',
					req.protocol + '://' + req.get('host') + '/restorepassword?id=' + user.id + '&hash=' + hash.passwordHash.substr(0, 16) + hash.salt
				)
				.then(() => resolve())
				.catch(err => reject({message: 'Ошибка отправки письма с инструкциями', err}));
			}))
			.then(() => res.status(200).send({send: true}))
			.catch(err => {
				if (typeof err.message !== 'undefined')
					res.status(400).send({message: err.message, err: err.err});
				else
					res.status(400).send({message: 'Пользователь с таким E-Mail не найден', err})
			});
	},
	restorePassword(req, res) {
		if (req.body.id === 'null' && req.body.hash === 'null') {
			res.status(400).send({message: 'Переданы ошибочные параметры пользователя'});
			return;
		}
		User.findById(+req.body.id)
			.then(user => new Promise((resolve, reject) => {
				const salt = req.body.hash.substr(16, req.body.hash.length);
				if (req.body.hash.substr(0, 16) !== hashGenerator(user.email, salt).passwordHash.substr(0, 16))
					reject({message: 'Переданы ошибочные параметры пользователя'});
				else
					resolve(user);
			}))
			.then(user => user.update({
				password: JSON.stringify(hashGenerator(req.body.password)),
				pin: JSON.stringify(hashGenerator(req.body.pin))
			}))
			.then(() => res.status(200).send({isUpdate: true}))
			.catch(err => {
				if (typeof err.message !== 'undefined')
					res.status(400).send({message: err.message});
				else
					res.status(400).send({message: 'Пользователь с таким id не найден', err})
			});
	}
};
