const express = require('express');
// const userModel = require('../models/ConsultUser.js');
// const cors = require('cors');
// codeverification

const router = express.Router();

// DEV MODE LOGGING
const envmode = process.env.NODE_ENV || 'DEV';
router.use((req, res, next) => {
  if (envmode === 'DEV') {
    console.info(`Verification Services: Sevicing ${req.url}`);
    next();
  }
});

// router.post('/email', (req, res) => {
// req.headers.eaddr;
// }
// );

module.exports = router;