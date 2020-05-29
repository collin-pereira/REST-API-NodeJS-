const Sequelize = require('sequelize')

const db = new Sequelize('test', 'postgres', 'sa123456#', {
    host: 'localhost',
    dialect: 'postgres'
  });

module.exports = db