const express = require('express');
const userModel = require('../models/ConsultUser.js');
const cors = require('cors');
var router = express.Router();

// DEV MODE LOGGING
const envmode = process.env.NODE_ENV || 'DEV';
router.use((req, res, next) => {
	if (envmode === 'DEV') {
		console.info(`WebActions: Sevicing ${req.url}`);
		next();
	}
});

// Configure cors options
const corsOptions = {
	origin: [
		// Add all hosts for which requests would be accepted.
		// NOTE: DO NOT ADD HTTP links. HTTPS only for requests.
		'https://www.crazydeveloper.fail', // crazydeveloper host
		'https://rmishra.me', // Personal Website
		'https://www.rmishra.me' // Alt path
	],
	optionsSuccessStatus: 200
};

// Add cors to preflight / OPTIONS
router.options('*', cors(corsOptions));

// Service contactMeAction
router.post('/contactMeAction', cors(corsOptions), (req, res) => {
	// Get info from request into vars.
	let name = req.body.name;
	let email = req.body.mail;
	if (envmode === 'DEV') {
		console.log(`Processing request for ${name} at ${email}`);
	}
	userModel.create({ name: name, email: email });
	res.send('Received!');
});

module.exports = router;
