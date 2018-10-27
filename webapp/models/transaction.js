'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    natureza: DataTypes.STRING,
    valor: DataTypes.FLOAT
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Client);
  };
  return Transaction;
};