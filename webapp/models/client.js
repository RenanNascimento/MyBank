'use strict';

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    nome: DataTypes.STRING,
    firstName: DataTypes.STRING
  }, {});
  return Client;
};