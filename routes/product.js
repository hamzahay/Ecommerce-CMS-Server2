const router = require('express').Router()
const Controller = require('../controller/productController')
const { authorize, authenticate } = require('../middleware/auth')


router.get('/', Controller.getAll)
router.use(authenticate)
router.use(authorize)
router.post('/', Controller.create)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.delete)

module.exports = router