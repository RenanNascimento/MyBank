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
      result.render('transactions-menu', { nome: data.nome, num_conta: data.num_conta, saldo: data.saldo });
    }
  })
});

module.exports = router;