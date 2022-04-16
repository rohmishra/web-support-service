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
const serve_port = process.env.PORT || null;
const mongo_URI = process.env.MONGODB_URI || null;

const mongo_options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

// Connect to DB.
mon.connect(mongo_URI, mongo_options);

// load routes
const webActions = require('./routes/WebActions.js'); // WebActions
App.use('/WebActions', webActions);

App.get('/', (req, res) => {
	res.redirect(302, `//${process.env.DOMAIN}`);
});

App.listen(serve_port, () => {
	console.log(`listening on ${serve_port}. Connecting to DB`);
});