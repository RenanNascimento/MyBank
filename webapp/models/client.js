'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    nome: DataTypes.STRING,
    idade: DataTypes.INTEGER,
    endereco: DataTypes.STRING,
    num_conta: DataTypes.INTEGER,
    saldo: DataTypes.FLOAT
  }, {});
  Client.associate = function(models) {
    Client.hasMany(models.Transaction, {onDelete: 'cascade', hooks: true});
  };
  return Client;
};