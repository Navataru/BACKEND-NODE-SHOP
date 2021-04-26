const Router = require('express')
const router = new Router()
const userdataController = require('../controllers/userdataController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', userdataController.create)
// router.get('/', deviceController.getAll)
// router.get('/:id', deviceController.getOne)

module.exports = router
