const express = require('express');
var model = require('../models/index');

const router = express.Router();

/* Get all clients */
router.get('/', (req, res, next) => {
  model.Client
    .findAll()
    .then(client => res.json(client))
    .catch(err => next(err))
});

/* Get client by account id */
router.get('/:account_id', (req, res, next) => {
  let account_id = req.params.account_id;
  model.Client
    .findAll({
      where: {
        id: account_id
      }
    })
    .then(client => res.json(client))
    .catch(err => next(err))
});

/* Create a client */
router.post('/', (req, res) => {
  console.log(req.body)
  model.Client
    .create(req.body)
    .then(client => res.json(client))
    .catch(err => next(err));
})

module.exports = router;