const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Organisation = require('../models/organisation')
const User = require('../models/user')
const logAction = require('../utils/logAction')

exports.register = async (req, res) => {
  const { orgName, adminName, email, password } = req.body

  const org = await Organisation.create({ name: orgName })

  const hash = await bcrypt.hash(password, 10)

  const user = await User.create({
    name: adminName,
    email,
    password_hash: hash,
    OrganisationId: org.id
  })

  const token = jwt.sign(
    { userId: user.id, orgId: org.id },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  )

  await logAction('register_organisation', org.id, user.id)

  res.json({ token })
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ where: { email } })
  if (!user) return res.status(404).json({ error: "User not found" })

  const match = await bcrypt.compare(password, user.password_hash)
  if (!match) return res.status(401).json({ error: "Wrong password" })

  const token = jwt.sign(
    { userId: user.id, orgId: user.OrganisationId },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  )

  await logAction('user_login', user.OrganisationId, user.id)

  res.json({ token })
}
