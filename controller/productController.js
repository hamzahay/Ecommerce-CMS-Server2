const { Product } = require('../models')

class Controller {

  static async create (req, res, next) {
    try {
      const { name, image_url, price, stock } = req.body
      const UserId = req.UserId
      const product = await Product.create({ name, image_url, price, stock, UserId })
      res.status(201).json({
        id: product.id,
        name: product.name,
        image_url: product.image_url,
        price: product.price,
        stock: product.stock,
        UserId: product.UserId
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = Controller