'use strict';

const Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'develop';
const config    = require(`${__dirname}/../config/config.json`)[env];
const db        = {};

// const Op = Sequelize.Op

let sequelize = config.use_env_variable ?
	new Sequelize(
		process.env.PROD_DB_NAME,
		process.env.PROD_DB_USERNAME,
		process.env.PROD_DB_PASSWORD,
		{
			host: process.env.PROD_DB_HOSTNAME,
			port: process.env.PROD_DB_PORT,  
			dialect: config.dialect
		}
	) :
	new Sequelize(
		config.database,
		config.username,
		config.password,
		{
		  host: config.host,
		  dialect: config.dialect,
		  logging: false,
		  freezeTableName: true,
		  operatorsAliases: false
		}
	);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Models/tables
db.users = require('./user.js')(sequelize, Sequelize);  
db.bills = require('./bill.js')(sequelize, Sequelize);  
db.operations = require('./operation.js')(sequelize, Sequelize);
db.categories = require('./category.js')(sequelize, Sequelize);

db.users.hasMany(db.bills, {foreignKey: 'UserId', sourceKey: 'id'});
db.users.hasMany(db.operations, {foreignKey: 'UserId', sourceKey: 'id'});
db.users.hasMany(db.categories, {foreignKey: 'UserId', sourceKey: 'id'});
db.bills.hasMany(db.operations, {foreignKey: 'BillId', sourceKey: 'id'});
db.categories.hasMany(db.operations, {foreignKey: 'CategoryId', sourceKey: 'id'});

db.bills.belongsTo(db.users);
db.operations.belongsTo(db.users);
db.operations.belongsTo(db.bills);
db.operations.belongsTo(db.categories);
db.categories.belongsTo(db.users);

module.exports = db;
