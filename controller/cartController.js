const { Cart, Product, History } = require('../models')

class Controller {

  static async addCart (req, res, next) {
    try {
      const ProductId = req.params.productId
      const UserId = req.user.id
      const cart = await Cart.create({ UserId, ProductId })
      res.status(201).json({ 
        id: cart.id,
        UserId: cart.UserId,
        ProductId: cart.ProductId,
        quantity: cart.quantity,
        status: cart.status
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async getUserCart (req, res, next) {
    try {
      const UserId = req.user.id
      const carts = await Cart.findAll({ where: { UserId, status: false }, attributes: {include: ['id'], exclude: ['createdAt', 'updatedAt'] },
      include: { model: Product, attributes: { exclude: ['createdAt', 'updatedAt'] }}})
      res.status(200).json(carts)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async addCartQuantity (req, res, next) {
    try {
      const id = req.params.id
      const operator = req.body.operator
      const cart = await Cart.findOne({ where: { id }})
      const product = await Product.findByPk(cart.ProductId)
      let quantity
      if (operator == 'plus') {
        if (product.stock !== cart.quantity) {
          quantity = cart.quantity + 1
        } else {
          throw ({ name: 401 })
        }
      } else if (operator == 'minus') {
        quantity = cart.quantity - 1
      }
      const response = await Cart.update({ quantity }, { where: { id }})
      res.status(200).json({ message: 'Update Success' })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async deleteCart (req, res, next) {
    try {
      const id = req.params.id
      const response = await Cart.destroy({ where: { id }})
      res.status(200).json({ message: 'Delete Success' })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async checkout (req, res, next) {
    try {
      const id = req.params.id
      const status = true
      const cart = await Cart.update({ status }, { where: { id }, returning: true })
      const product = await Product.findOne({ where: { id: cart[1][0].ProductId }})
      const history = await History.create({ 
        name: product.name,
        imageUrl: product.image_url,
        price: product.price,
        quantity: cart[1][0].quantity
      })
      res.status(200).json({
        id: history.id,
        name: history.name,
        imageUrl: history.image_url,
        price: history.price,
        quantity: history.quantity
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = Controller