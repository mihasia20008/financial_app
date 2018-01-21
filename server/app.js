const express = require('express'),
	  bodyParser = require('body-parser'),
	  logger = require('morgan');

const app = express();

app.use(logger('dev'));

const isDevelopment = process.env.NODE_ENV !== 'production';
// const PUBLIC_PATH = __dirname + '/../dist';

if (isDevelopment) {
	console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...');
  	const webpack = require('webpack');
  	const webpackConfig = require('./../bin/webpack/webpack.develop.config');
  	const compiler = webpack(webpackConfig);
  	app.use(require('webpack-dev-middleware')(compiler, {
		publicPath: webpackConfig.output.publicPath,
		hot: true,
		stats: {
			colors: true,
			chunks: false, // this reduces the amount of stuff I see in my terminal; configure to your needs
			'errors-only': true
		}
  	}));
  	app.use(require('webpack-hot-middleware')(compiler, {
		log: console.log
	}));
} else {
	console.log('PRODUCTION ENVIRONMENT');
}

// app.use(express.static(PUBLIC_PATH));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app);
app.get('*', (req, res) => {
	res.status(200);
});

module.exports = app;
