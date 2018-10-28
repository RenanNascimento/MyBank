'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    client_id: DataTypes.INTEGER,
    natureza: DataTypes.STRING,
    valor: DataTypes.FLOAT,
    saldo_parcial: DataTypes.FLOAT
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};