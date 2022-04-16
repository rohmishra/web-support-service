const express = require('express');
const bodyparser = require('body-parser');
const mon = require('mongoose');

const envmode = process.env.NODE_ENV || 'DEV';

const App = express();
App.use(bodyparser.json());

// Config for TEST MODE.
if (envmode != 'live') {
	console.info(`Running in ${envmode} mode.`);
	const logger = require('morgan'); // Adds Logging for dev mode.
	App.use(logger('combined'));
	// Load config Vars from .env
	const env = require('dotenv');
	env.config();
}

// IF CI specific setup is required; use CI check
if (envmode === 'ci') {
	console.info('=== RUN: CI TEST ===');
}

// Config
const serve_port = process.env.PORT || 80018;
const mongo_URI = `mongodb+srv://${process.env.GCPATL_USR}:${process.env.GCPATL_KEY}@${process.env.MONGODB_URI}`;

const mongo_options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: process.env.dbName
};

// Connect to DB.
try {
	mon.connect(mongo_URI, mongo_options);
} catch (e) {
	console.error('Unable to conect to storage: not storing anything');
} finally {
	if (mon.connection) {
		console.info(`Database Status: ${mon.connection.readyState}`);
	} else {
		console.warn('NOT READY FOR DEPLOYMENT');
	}
}

// load routes
const webActions = require('./routes/WebActions.js'); // WebActions
App.use('/WebActions', webActions);

// Redirect to homepage
App.get('/', (req, res) => {
	res.redirect(302, `//${process.env.DOMAIN}`);
});

// unknown endpoint error handler
App.use((req, res, next) => {
	var err = new Error('No suitable endpoint for ' + req.url);
	err.status = 404;
	next(err);
});

// Catch all
App.use((err, req, res) => {
	res.status(err.status || 500);
	res.send(err.message);
});


App.listen(serve_port, () => {
	console.log(`listening on ${serve_port}. Connecting to DB`);
});