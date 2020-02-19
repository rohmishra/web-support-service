// Load env vars
require('dotenv').config();

const express = require('express');
const db = require('mongoose');
const App = express();

const serve_port = process.env.PORT || process.env.TEST_PORT;
const mongo_URI = process.env.MONGODB_URI || process.env.DB_HOST;

const mongo_options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

db.connect(mongo_URI, mongo_options);
db.connection
	.once('open', (_) => {
		console.log('CONNECTED TO DB at ' + db.connection.host);
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
