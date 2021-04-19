const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/', authMiddleware, basketController.create)
router.get('/', authMiddleware, basketController.getAll)


module.exports = router
