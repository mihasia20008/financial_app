'use strict';

const Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'development';
const config    = require(`${__dirname}/../config/config.json`)[env];
const db        = {};

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
db.user = require('./user.js')(sequelize, Sequelize);  
db.bill = require('./bill.js')(sequelize, Sequelize);  
db.cardBill = require('./cardbill.js')(sequelize, Sequelize);  
db.cashBill = require('./cashbill.js')(sequelize, Sequelize);  
db.creditBill = require('./creditbill.js')(sequelize, Sequelize);  
db.depositBill = require('./depositbill.js')(sequelize, Sequelize);  
// db.operations = require('./operation.js')(sequelize, Sequelize);
db.category = require('./category.js')(sequelize, Sequelize);

db.user.hasMany(db.bill, {foreignKey: 'UserId', sourceKey: 'id'});
db.bill.hasMany(db.cardBill, {foreignKey: 'BillId', sourceKey: 'id'});
db.bill.hasMany(db.cashBill, {foreignKey: 'BillId', sourceKey: 'id'});
db.bill.hasMany(db.creditBill, {foreignKey: 'BillId', sourceKey: 'id'});
db.bill.hasMany(db.depositBill, {foreignKey: 'BillId', sourceKey: 'id'});
// db.users.hasMany(db.operations, {foreignKey: 'UserId', sourceKey: 'id'});
db.user.hasMany(db.category, {foreignKey: 'UserId', sourceKey: 'id'});
// db.bills.hasMany(db.operations, {foreignKey: 'BillId', sourceKey: 'id'});
// db.categories.hasMany(db.operations, {foreignKey: 'CategoryId', sourceKey: 'id'});

db.bill.belongsTo(db.user);
db.cardBill.belongsTo(db.bill);
db.cashBill.belongsTo(db.bill);
db.creditBill.belongsTo(db.bill);
db.depositBill.belongsTo(db.bill);
// db.operations.belongsTo(db.users);
// db.operations.belongsTo(db.bills);
// db.operations.belongsTo(db.categories);
db.category.belongsTo(db.user);

module.exports = db;
