let express = require('express');
let request = require('request') ;

let router = express.Router();

const PORT = process.env.PORT || '3000';
const WEB_HOST = process.env.WEB_HOST || 'localhost';

router.get('/', (req, res) => {
  res.render('error');
});

router.get('/:account_id', (req, result) => {
  let reqURL = `http://${WEB_HOST}:${PORT}/clients/${req.params.account_id}`
  request(reqURL, (error, res, body) => {
    if(error) console.log(error) 
    else{
      let data = JSON.parse(body)[0]
      result.render('transactions-menu', { id: data.id, nome: data.nome, num_conta: data.num_conta, saldo: data.saldo.toFixed(2).replace('.', ',') });
    }
  })
});

router.get('/sacar/:account_id', (req, result) => {
  let reqURL = `http://${WEB_HOST}:${PORT}/clients/${req.params.account_id}`
  request(reqURL, (error, res, body) => {
    if(error) console.log(error) 
    else{
      let data = JSON.parse(body)[0]
      result.render('sacar', { id: data.id, nome: data.nome, num_conta: data.num_conta, saldo: data.saldo.toFixed(2).replace('.', ',') });
    }
  })
});

router.post('/sacar/:account_id', (req, result) => {
  let reqURL = `http://${WEB_HOST}:${PORT}/clients/sacar/${req.params.account_id}/${req.body.saque}`
  console.log(reqURL)
  request(reqURL, (error, res, body) => {
    if(error) console.log(error) 
    else{
      let data = JSON.parse(body)
      result.render('sacar', { id: data.id, nome: data.nome, num_conta: data.num_conta, saldo: data.saldo.toFixed(2).replace('.', ',') });
    }
  })
});

router.get('/depositar/:account_id', (req, result) => {
  let reqURL = `http://${WEB_HOST}:${PORT}/clients/${req.params.account_id}`
  request(reqURL, (error, res, body) => {
    if(error) console.log(error) 
    else{
      let data = JSON.parse(body)[0]
      result.render('depositar', { id: data.id, nome: data.nome, num_conta: data.num_conta, saldo: data.saldo.toFixed(2).replace('.', ',') });
    }
  })
});

router.post('/depositar/:account_id', (req, result) => {
  let reqURL = `http://${WEB_HOST}:${PORT}/clients/depositar/${req.params.account_id}/${req.body.deposito}`
  request(reqURL, (error, res, body) => {
    if(error) console.log(error) 
    else{
      let data = JSON.parse(body)
      result.render('depositar', { id: data.id, nome: data.nome, num_conta: data.num_conta, saldo: parseFloat(data.saldo).toFixed(2).replace('.', ',') });
    }
  })
});


module.exports = router;