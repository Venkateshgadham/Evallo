const Log = require('../models/log')

module.exports = async (action, organisation_id, user_id, meta = {}) => {
  await Log.create({
    action,
    organisation_id,
    user_id,
    meta
  })
}
