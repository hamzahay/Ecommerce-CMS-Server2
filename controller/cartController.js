const { Cart, Product } = require('../models')

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
      const carts = await Cart.findAll({ where: { UserId }, attributes: {include: ['id'], exclude: ['createdAt', 'updatedAt'] },
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
      const cart = await Cart.findOne({ where: { id }})
      if (cart) {
        const product = await Product.findByPk(cart.id)
        if (product.stock !== cart.quantity) {
          const quantity = cart.quantity++
          const response = await Cart.update({ quantity }, { where: { id }})
          res.status(200).json({ message: 'Update Success' })
        } else {
          throw ({ name: 401 })
        }
      } else {
        throw ({ name: 404 })
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async deleteCart (req, res, next) {
    try {
      const id = req.params.id
      const response = await Cart.destoy({ where: { id }})
      res.status(200).json({ message: 'Delete Success' })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = Controller