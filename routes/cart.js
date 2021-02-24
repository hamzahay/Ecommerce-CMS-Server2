const router = require('express').Router()
const Controller = require('../controller/cartController')

router.post('/:productId', Controller.addCart)
router.get('/', Controller.getUserCart)

module.exports = router