const express = require('express');
const userModel = require('../models/ConsultUser.js');
const cors = require('cors');
// const mailgun = require('mailgun.js'); // TODO: require mailgun and send email to verify user email
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
// router.options('*', cors(corsOptions));

// Service reach by email requests for rmishra.me
router.post('/rme_cb_act_email', cors(corsOptions), async (req, res) => {
	// Get info from request into vars.
	let name = req.body.name;
	let email = req.body.mail;

	if (envmode === 'DEV') {
		console.log(`Processing request for ${name} at ${email}`);
	}

	let user = null;

	try {
		user = await userModel.create({
			name: name,
			email: email
		});
	} catch (e) {
		console.message('=== A fault occurred ===');
		console.error(e.message);
	}

	// TODO: Send email verification
	// const DOMAIN = process.env.DOMAIN;
	// const mg = mailgun({
	// 	apiKey: process.env.MG_API_KEY,
	// 	domain: DOMAIN
	// });
	// const data = {
	// 	from: process.env.FROM_TEXT || 'email verification',
	// 	to: email,
	// 	subject: `Hi, ${name} Lets Talk!`,
	// 	template: 'contact_verification',
	// 	'h:X-Mailgun-Variables': {
	// 		email_base64: Buffer.from(email, 'utf8').toString('base64'),
	// 		unique_token: user.verification_token
	// 	}
	// };
	// try {
	// 	mg.messages().send(data, function (error, body) {
	// 		if (envmode === 'DEV') {
	// 			console.log(body);
	// 		}
	// 	});
	// } catch (e) {
	// 	console.message('=== Couldn\'t send email ===');
	// 	console.log(e);
	// }

	res.send('Received! ' + user.name);
});

module.exports = router;