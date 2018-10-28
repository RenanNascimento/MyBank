'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    nome: DataTypes.STRING,
    idade: DataTypes.INTEGER,
    endereco: DataTypes.STRING,
    num_conta: DataTypes.STRING,
    saldo: DataTypes.FLOAT,
    senha: DataTypes.STRING
  }, {});
  Client.associate = function(models) {
    // associations can be defined here
  };
  return Client;
};