const Employee = require('../models/employee')
const logAction = require('../utils/logAction')

exports.list = async (req, res) => {
  const employees = await Employee.findAll({
    where: { OrganisationId: req.user.orgId }
  })
  res.json(employees)
}

exports.create = async (req, res) => {
  const employee = await Employee.create({
    ...req.body,
    OrganisationId: req.user.orgId
  })

  await logAction('employee_created', req.user.orgId, req.user.userId, { employee })

  res.json(employee)
}

exports.delete = async (req, res) => {
  await Employee.destroy({ where: { id: req.params.id } })

  await logAction('employee_deleted', req.user.orgId, req.user.userId, { id: req.params.id })

  res.json({ message: "Deleted" })
}
