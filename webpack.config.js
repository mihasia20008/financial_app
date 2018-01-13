// import Config, { environment } from 'webpack-config';
//
// environment.setAll({
//   env: () => process.env.NODE_ENV
// });
//
// export default new Config().extend('./bin/webpack/webpack.[env].config.js');

const webpackProduction = require('./bin/webpack/webpack.production.config.js');

module.exports = webpackProduction;
