const express = require('express');
const Client = require('../models/client')

const router = express.Router();


router.get('/', (req, res) => {
  Client.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
  res.status(200).json({ message: teste() })
});

module.exports = router;