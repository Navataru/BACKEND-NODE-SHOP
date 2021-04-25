const Router = require('express')
const router = new Router()
const userdataController = require('../controllers/userdataController')

router.post('/', userdataController.create)
// router.get('/', deviceController.getAll)
// router.get('/:id', deviceController.getOne)

module.exports = router
