const express = require('express')
const cors = require('cors')
const sequelize = require('./db')

require('./models/organisation')
require('./models/user')
require('./models/employee')
require('./models/team')
require('./models/employeeTeam')
require('./models/log')

const authRoutes = require('./routes/auth')
const employeeRoutes = require('./routes/employees')
const teamRoutes = require('./routes/teams')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/teams', teamRoutes)

sequelize.sync().then(() => {
  console.log("DB Synced")
  app.listen(5000, () => console.log("Server running on 5000"))
})
