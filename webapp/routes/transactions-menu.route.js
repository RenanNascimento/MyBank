let express = require('express');
let request = require('request');

let router = express.Router();

const PORT = process.env.PORT || '3000';
const WEB_HOST = process.env.WEB_HOST || 'localhost';

router.get('/', (req, res) => {
  res.render('error');
});

/* Get page menu transacoes */
router.get('/:account_id', (req, result) => {
  let reqURL = `http://${WEB_HOST}:${PORT}/clients/${req.params.account_id}`
  request(reqURL, (error, res, body) => {
    if(error) console.log(error)
    else{
      let data = JSON.parse(body)
      if(data.length != 0){
        data = data[0]
        result.render('transactions-menu', { id: data.id, nome: data.nome, num_conta: data.num_conta, saldo: data.saldo.toFixed(2).replace('.', ',') });
      }else{
        result.render('error')
      }
    }
  })
});

/* Get page sacar */
router.get('/sacar/:account_id', (req, result) => {
  let reqURL = `http://${WEB_HOST}:${PORT}/clients/${req.params.account_id}`
  request(reqURL, (error, res, body) => {
    if(error) console.log(error) 
    else{
      let data = JSON.parse(body)
      if(data.length != 0){
        data = data[0]
        result.render('sacar', { id: data.id, nome: data.nome, num_conta: data.num_conta, saldo: data.saldo.toFixed(2).replace('.', ',') });
      }else{
        result.render('error')
      }
    }
  })
});

/* POST saque */
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

/* Get page depositar */
router.get('/depositar/:account_id', (req, result) => {
  let reqURL = `http://${WEB_HOST}:${PORT}/clients/${req.params.account_id}`
  request(reqURL, (error, res, body) => {
    if(error) console.log(error) 
    else{
      let data = JSON.parse(body)
      if(data.length != 0){
        data = data[0]
        result.render('depositar', { id: data.id, nome: data.nome, num_conta: data.num_conta, saldo: data.saldo.toFixed(2).replace('.', ',') });
      }else{
        result.render('error')
      }
    }
  })
});

/* POST deposito */
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

/* Get page extrato */
router.get('/extrato/:account_id', (req, result) => {
  let reqURL = `http://${WEB_HOST}:${PORT}/clients/extrato/${req.params.account_id}`
  request(reqURL, (error, res, body) => {
    if(error) console.log(error) 
    else{
      let data = JSON.parse(body)
      data = data.map(d => {
        return {
          client_id: d.client_id,
          natureza: d.natureza,
          valor: parseFloat(d.valor).toFixed(2).replace('.', ','),
          saldo_parcial: parseFloat(d.saldo_parcial).toFixed(2).replace('.', ','),
          createdAt: d.createdAt,
          updatedAt: d.updatedAt.split('-')[2].slice(0,2)+'/'+d.updatedAt.split('-')[1]+'/'+d.updatedAt.split('-')[0]
        }
      })
      result.render('extrato', {id: req.params.account_id, extratos: data});
    }
  })
});


module.exports = router;