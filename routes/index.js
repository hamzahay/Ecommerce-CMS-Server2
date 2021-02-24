const router = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const cartRoutes = require('./cart')
const { authenticate } = require('../middleware/auth')

router.use('/', userRoutes)
router.use(authenticate)
router.use('/products', productRoutes)
router.use('/carts', cartRoutes)

module.exports = router