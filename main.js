// Load env vars
require('dotenv').config();

import express from 'express';
import { connect, connection } from 'mongoose';
const App = express();

const serve_port = process.env.PORT || process.env.TEST_PORT;
const mongo_URI = process.env.MONGODB_URI || process.env.DB_HOST;

const mongo_options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

connect(mongo_URI, mongo_options);
connection
	.once('open', (_) => {
		console.log('CONNECTED TO DB at ' + connection.host);
	})
	.catch((error) => {
		console.log('Error:' + error);
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
