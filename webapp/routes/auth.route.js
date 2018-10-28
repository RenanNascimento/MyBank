const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var model = require('../models/index');

router.get('/login', (req, res, next) => {
  res.render('login');
})

router.post('/entrar', (req, res, next) => {
  model.Client
  .findAll({
    where: {
      nome: "renan",
      senha: "renan"
    }
  })
  .then(client => res.redirect('/menu-transacoes/'+client[0].dataValues.id))
  .catch(err => console.log(err))
})

router.post('/authenticate', (req, res, next) => {
  let { nome, senha } = req.body

  const comparePassword = (user, password) => new Promise((res, rej) => { 
    bcrypt.compare(password, user.senha, (err, equal) => {
      if (equal) res(user)
      else rej (err || 'wrong password')
    })
  })

  model.Client
    .findOne({
      where: { nome: nome }
    })
    .then(client => (client) ? client : Promise.reject("Client not found."))
    .then(client => comparePassword(client, senha))
    .then(client => {
      let payload = { id: client.id };
      let token = jwt.sign(payload, process.env.JWT_SECRET,
        {
          expiresIn: '1d',
          algorithm: 'HS512'
        });
      return { message: "ok", token: token };
    })
    .then(result => res.status(200).json(result))
    .catch(err => {
      res.status(401)
        .json({
          message: err || "Validation failed. Given username and password aren't matching."
        })
    })
});

router.post('/cadastrar', (req, res, next) => {
    let { nome, idade, endereco, num_conta, saldo, senha } = req.body
  
    model.Client
        .create({
          nome: nome,
          idade: idade,
          endereco: endereco,
          num_conta: num_conta,
          saldo: 0.0,
          senha: senha
        })
      .then(client => {
        res.redirect('/menu-transacoes/'+client.dataValues.id);
      })
      .catch(err => {
        res.status(401)
          .json({
            message: `Registration failed: ${err}`
          })
      })
  });

module.exports = router;