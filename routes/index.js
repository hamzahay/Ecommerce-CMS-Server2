const router = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const cartRoutes = require('./cart')
const { authenticate } = require('../middleware/auth')
const Controller = require('../controller/historyController')

router.use('/', userRoutes)
router.use('/products', productRoutes)
router.use(authenticate)
router.use('/carts', cartRoutes)
router.get('/histories', Controller.getHistories)
module.exports = router