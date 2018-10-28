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

/* Update client saldo - saque */
router.get('/sacar/:account_id/:valor_saque', (req, res, next) => {
  let account_id = req.params.account_id;
  let valor_saque = req.params.valor_saque;

  model.Client
    .findOne({
      where: {
        id: account_id
      }
    })
    .then(client => client.update({
      saldo: client.dataValues.saldo - valor_saque
    }).then(new_client => {
      model.Transaction
        .create({
          client_id: new_client.dataValues.id,
          natureza: "SAQUE",
          valor: valor_saque,
          saldo_parcial: new_client.dataValues.saldo
        })
        .then(transaction => res.json(new_client))
        .catch(err => next(err))
    }))
    .catch(err => next(err))
});

/* Update client saldo - deposito */
router.get('/depositar/:account_id/:valor_deposito', (req, res, next) => {
  let account_id = req.params.account_id;
  let valor_deposito = req.params.valor_deposito;

  model.Client
    .findOne({
      where: {
        id: account_id
      }
    })
    .then(client => client.update({
      saldo: parseFloat(client.dataValues.saldo) + parseFloat(valor_deposito)
    }).then(new_client => {
      model.Transaction
        .create({
          client_id: new_client.dataValues.id,
          natureza: "DEPOSITO",
          valor: valor_deposito,
          saldo_parcial: new_client.dataValues.saldo
        })
        .then(transaction => res.json(new_client))
        .catch(err => next(err))
    }))
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