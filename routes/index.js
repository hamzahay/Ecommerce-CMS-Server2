const router = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const { authenticate } = require('../middleware/auth')

router.use('/', userRoutes)
router.use(authenticate)
router.use('/products', productRoutes)

module.exports = router