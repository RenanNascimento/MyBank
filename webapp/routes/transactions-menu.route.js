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
      result.render('transactions-menu', { id: data.id, nome: data.nome, num_conta: data.num_conta, saldo: data.saldo });
    }
  })
});

router.get('/sacar/:account_id', (req, result) => {
  let reqURL = `http://${WEB_HOST}:${PORT}/clients/${req.params.account_id}`
  request(reqURL, (error, res, body) => {
    if(error) console.log(error) 
    else{
      let data = JSON.parse(body)[0]
      result.render('sacar', { id: data.id, nome: data.nome, num_conta: data.num_conta, saldo: data.saldo });
    }
  })
});

router.post('/sacar/:account_id', (req, result) => {
  let reqURL = `http://${WEB_HOST}:${PORT}/clients/${req.params.account_id}/${req.body.saque}`
  console.log(reqURL)
  request(reqURL, (error, res, body) => {
    if(error) console.log(error) 
    else{
      let data = JSON.parse(body)
      result.render('sacar', { id: data.id, nome: data.nome, num_conta: data.num_conta, saldo: data.saldo.toFixed(2).replace('.', ',') });
    }
  })
});

module.exports = router;