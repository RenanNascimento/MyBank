'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    natureza: DataTypes.STRING,
    valor: DataTypes.FLOAT
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};