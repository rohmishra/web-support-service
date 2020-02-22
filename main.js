// Load env vars
import env from 'dotenv';
import express from 'express';
import bodyparser from 'body-parser';
import mon from 'mongoose';
import logger from 'morgan'; // Adds Logging for dev mode.

const App = express();
App.use(bodyparser.json());

// Config for TEST MODE.
const envmode = process.env.NODE_ENV || 'DEV';
if (envmode != 'production') {
	console.info(`Running in ${envmode} mode.`);
	App.use(logger('combined'));
	// Load config Vars from .env
	env.config();
}

// Config
const serve_port = process.env.PORT;
const mongo_URI = process.env.MONGODB_URI;

// load routes
import webActions from './routes/WebActions.js'; // WebActions
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
		`You have reached support service host for <a href="https://www.crazydeveloper.fail">my personal site!</a>
		<br />Why dont you visit that instead!!`
	);
});

// App.use('/');

App.listen(serve_port, (e) => {
	console.log(`listening on ${serve_port}. Connecting to DB at ${mongo_URI}`);
});
