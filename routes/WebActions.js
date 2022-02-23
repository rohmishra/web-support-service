const express = require('express');
const userModel = require('../models/ConsultUser.js');
const cors = require('cors');
// 	const mailgun = require("mailgun-js"); // TODO: require mailgun and send email to verify user email
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

// Service reach by email requests for rmishra.me
router.post('/rme_cb_act_email', cors(corsOptions), (req, res) => {
	// Get info from request into vars.
	let name = req.body.name;
	let email = req.body.mail;
	if (envmode === 'DEV') {
		console.log(`Processing request for ${name} at ${email}`);
	}
	userModel.create({ name: name, email: email });

	// TODO: Send email verification
	// const DOMAIN = "rmishra.me";
	// const mg = mailgun({apiKey: process.env.MG_API_KEY, domain: DOMAIN});
	// const data = {
	// 	from: "Rohan (Confirming your email) <verification@rmishra.me>",
	// 	to: "rohmish26@gmail.com",
	// subject: `Hi, ${name} Lets Talk!`,
	// 	template: "contact_verification",
	// 	'h:X-Mailgun-Variables': {email_base64: base64(email), unique_token: entry.verification_token}
	// };
	// mg.messages().send(data, function (error, body) {
	// 	console.log(body);
	// });

	res.send('Received!');
});

module.exports = router;
