// Load env vars
require('dotenv').config();

const express = require('express');
const App = express();

const serve_port = process.env.PORT || process.env.TEST_PORT;
const mongo_URI = process.env.MONGODB_URI || process.env.DB_HOST;

App.get('/', (req, res) => {
	res.send(`Working.`);
});

// App.use('/');

App.listen(serve_port, (e) => {
	console.log(`listening on ${serve_port}. Connecting to DB at ${mongo_URI}`);
});
