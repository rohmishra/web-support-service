// Load env vars

const express = require('express');
const bodyparser = require('body-parser');
const mon = require('mongoose');

const App = express();
App.use(bodyparser.json());

// Config for TEST MODE.
const envmode = process.env.NODE_ENV || 'DEV';
if (envmode != 'production') {
	console.info(`Running in ${envmode} mode.`);
	const logger = require('morgan'); // Adds Logging for dev mode.
	App.use(logger('combined'));
	// Load config Vars from .env
	const env = require('dotenv');
	env.config();
}

// Config
const serve_port = process.env.PORT;
const mongo_URI = process.env.MONGODB_URI;

// load routes
const webActions = require('./routes/WebActions.js'); // WebActions
App.use('/WebActions', webActions);

const mongo_options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

// Connect to DB.
mon.connect(mongo_URI, mongo_options);
mon.connection
	.once('open', (_) => {
		if (envmode === 'DEV') {
			console.log('CONNECTED TO DB at ' + mon.connection.host);
		}
	})
	.catch((error) => {
		if (envmode === 'DEV') {
			console.log('Error:' + error);
		}
	});

App.get('/', (req, res) => {
	res.send(
		`You have reached support service host for <a href="https://rmishra.me">my personal site!</a>
		<br />Why dont you visit that instead!!`
	);
});

// App.use('/');

App.listen(serve_port, (e) => {
	console.log(`listening on ${serve_port}. Connecting to DB at ${mongo_URI}`);
});
