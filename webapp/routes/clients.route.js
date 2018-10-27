const express = require('express');
const db = require('../db/db');
const Client = db.import('../models/client');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(JSON.stringify(Client))
  Client.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
  res.status(200).json({ message: 'fad' })
});

module.exports = router;