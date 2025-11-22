const router = require('express').Router()
const auth = require('../middlewares/authMiddleware')
const { list, create, delete: del } = require('../controllers/employeeController')

router.use(auth)

router.get('/', list)
router.post('/', create)
router.delete('/:id', del)

module.exports = router
