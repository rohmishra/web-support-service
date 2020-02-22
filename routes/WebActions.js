import express from 'express';
import userModel from '../models/ConsultUser.js';
var router = express.Router();

// DEV MODE LOGGING
const envmode = process.env.NODE_ENV || 'DEV';
router.use((req, res, next) => {
	if (envmode === 'DEV') {
		console.info(`WebActions: Sevicing ${req.url}`);
		next();
	}
});

// Service contactMeAction
router.post('/contactMeAction', (req, res) => {
	// Get info from request into vars.
	let name = req.body.name;
	let email = req.body.mail;
	if (envmode === 'DEV') {
		console.log(`Processing request for ${name} at ${email}`);
	}
	userModel.create({ name: name, email: email });
	res.send('Received!');
});

export default router;
