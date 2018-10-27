const express = require('express');
const db = require('../db/db')

const router = express.Router();

const teste = () => new Promise((res, rej) => {
  let insertQuery =
  `SELECT 1;`
  db.pgClient.query(insertQuery, (err, result) => {
    if (err) rej(err)
    else res(result)
  })
}) 


router.get('/', (req, res, next) => {
  res.status(200).json({ message: teste() })
});

module.exports = router;