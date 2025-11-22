const router = require('express').Router()
const auth = require('../middlewares/authMiddleware')
const { list, create, delete: del, assign } = require('../controllers/teamController')

router.use(auth)

router.get('/', list)
router.post('/', create)
router.delete('/:id', del)
router.post('/:teamId/assign', assign)

module.exports = router
