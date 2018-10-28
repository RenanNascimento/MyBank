const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let request = require('request');

var model = require('../models/index');

const PORT = process.env.PORT || '3000';
const WEB_HOST = process.env.WEB_HOST || 'localhost';

router.get('/login', (req, res, next) => {
  res.render('login');
})

router.post('/entrar', (req, result, next) => {
  model.Client
  .findAll({
    where: {
      nome: req.body.nome,
      senha: req.body.senha
    }
  })
  .then(client => {
    if(req.body.nome == "admin" && req.body.senha == "admin"){

      let reqURL = `http://${WEB_HOST}:${PORT}/clients/`
      request(reqURL, (error, res, body) => {
        if(error) console.log(error) 
        else{
          let data = JSON.parse(body)
          data = data.map(d => {
            return {
              nome: d.nome,
              num_conta: d.num_conta,
              saldo: parseFloat(d.saldo).toFixed(2).replace('.', ',')
            }
          })
          result.render('admin', { clients: data });
        }
      })
    }else{
      result.redirect('/menu-transacoes/'+client[0].dataValues.id)
    }
    
  })
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
      .then(client => client.update({
        num_conta: `00${client.dataValues.id}-0`
      }).then(new_client => res.redirect('/menu-transacoes/'+new_client.dataValues.id))
        .catch(err => next(err))
      )
      .catch(err => {
        res.status(401)
          .json({
            message: `Registration failed: ${err}`
          })
      })
  });

module.exports = router;