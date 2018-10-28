let express = require('express');
let request = require('request') ;

let router = express.Router();

const PORT = process.env.PORT || '3000';
const WEB_HOST = process.env.WEB_HOST || 'localhost';

router.get('/', (req, res) => {
  res.render('menu');
});

router.get('/:account_id', (req, res) => {
  let reqURL = `http://${WEB_HOST}:${PORT}/clients/${req.params.account_id}`
  request(reqURL, (error, res, body) => {
    if(error) console.log(error)
    else{
      console.log(body)
    }
  })
  res.render('transactions-menu', { nome: 'oi', saldo: 20 });
});

module.exports = router;