const Team = require('../models/team')
const EmployeeTeam = require('../models/employeeTeam')
const logAction = require('../utils/logAction')

exports.list = async (req, res) => {
  const teams = await Team.findAll({ where: { OrganisationId: req.user.orgId } })
  res.json(teams)
}

exports.create = async (req, res) => {
  const team = await Team.create({
    ...req.body,
    OrganisationId: req.user.orgId
  })

  await logAction('team_created', req.user.orgId, req.user.userId, { team })

  res.json(team)
}

exports.delete = async (req, res) => {
  await Team.destroy({ where: { id: req.params.id } })

  await logAction('team_deleted', req.user.orgId, req.user.userId, { id: req.params.id })

  res.json({ message: "Deleted" })
}

exports.assign = async (req, res) => {
  const { employeeId } = req.body
  const { teamId } = req.params

  await EmployeeTeam.create({ EmployeeId: employeeId, TeamId: teamId })

  await logAction('employee_assigned_to_team', req.user.orgId, req.user.userId, { employeeId, teamId })

  res.json({ message: "Assigned" })
}
