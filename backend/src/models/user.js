const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const Organisation = require('./organisation')

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password_hash: DataTypes.STRING
})

User.belongsTo(Organisation)
Organisation.hasMany(User)

module.exports = User
