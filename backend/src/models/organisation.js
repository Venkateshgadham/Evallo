const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Organisation = sequelize.define('Organisation', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: DataTypes.STRING
})

module.exports = Organisation
