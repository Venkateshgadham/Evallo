const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const Employee = require('./employee')
const Team = require('./team')

const EmployeeTeam = sequelize.define('EmployeeTeam', {
  EmployeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: Employee,
      key: 'id'
    }
  },
  TeamId: {
    type: DataTypes.INTEGER,
    references: {
      model: Team,
      key: 'id'
    }
  },
  assigned_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
})

Employee.belongsToMany(Team, { through: EmployeeTeam })
Team.belongsToMany(Employee, { through: EmployeeTeam })

module.exports = EmployeeTeam
