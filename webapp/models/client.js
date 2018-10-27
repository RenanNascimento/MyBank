'use strict';

module.exports = (Sequelize, sequelize) => {
  const Client = sequelize.define('Client', {
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING }
  })
  return Client
};