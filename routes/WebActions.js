const express = require('express');
const userModel = require('../models/ConsultUser.js');
const cors = require('cors');
// const mailgun = require('mailgun-js'); // TODO: require mailgun and send email to verify user email
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
    'http://www.crazydeveloper.fail', // HTTP for crazydeveloper host - TODO: remove after moving to GCP
    'http://rmishra.me', // HTTP endpoint for rmishra.me - TODO: remove after moving to GCP
    'https://www.crazydeveloper.fail', // crazydeveloper host
    'https://rmishra.me', // Personal Website
    'https://www.rmishra.me' // Alt path
  ],
  optionsSuccessStatus: 200
};

// Add cors to preflight / OPTIONS
router.options('*', cors(corsOptions));

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

  // User.verify(onSuccess, onFail)

  res.send('Received! ' + user.name);
});

module.exports = router;