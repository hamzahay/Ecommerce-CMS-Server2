const router = require('express').Router()
const Controller = require('../controller/productController')
const { authorize } = require('../middleware/auth')

router.use(authorize)
router.post('/', Controller.create)
router.get('/', Controller.getAll)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.delete)

module.exports = router