const router = require('express').Router()
const Controller = require('../controller/cartController')
const { cartAuthorize } = require('../middleware/auth')

router.post('/:productId', Controller.addCart)
router.get('/', Controller.getUserCart)
router.patch('/:id', cartAuthorize, Controller.addCartQuantity)
router.patch('/checkout/:id', cartAuthorize, Controller.checkout)
router.delete('/:id', cartAuthorize, Controller.deleteCart)

module.exports = router