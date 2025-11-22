const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const Organisation = require('./organisation')

const Team = sequelize.define('Team', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: DataTypes.STRING,
  description: DataTypes.STRING
})

Team.belongsTo(Organisation)
Organisation.hasMany(Team)

module.exports = Team
