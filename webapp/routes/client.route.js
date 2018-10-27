const express = require('express');
const db = require('../db/db');
const Client = db.import('../models/client');

const router = express.Router();

router.get('/', (req, res, next) => {
  Client
    .findAll()
    .then(client => res.json(client))
    .catch(err => next(err))
});

router.get('/:account_id', (req, res, next) => {
  let account_id = req.params.account_id;
  Client
    .findAll({
      where: {
        id: account_id
      }
    })
    .then(client => res.json(client))
    .catch(err => next(err))
});

module.exports = router;