const { Product } = require('../models')

class Controller {

  static async create (req, res, next) {
    try {
      const { name, image_url, price, stock } = req.body
      const product = await Product.create({ name, image_url, price, stock })
      res.status(201).json({
        id: product.id,
        name: product.name,
        image_url: product.image_url,
        price: product.price,
        stock: product.stock
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async getAll (req, res, next) {
    try {
      const product = await Product.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] }, order: [['createdAt']]})
      res.status(200).json(product)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async update (req, res, next) {
    try {
      let { name, image_url, price, stock } = req.body
      const id = req.params.id
      const product = await Product.findOne({ where: { id: id }})
      if (product) {
        const update = await Product.update({ name, image_url, price, stock }, { where: { id: id }, returning: true })
        res.status(200).json({
          id: update[1][0].id,
          name: update[1][0].name,
          image_url: update[1][0].image_url,
          price: update[1][0].price,
          stock: update[1][0].stock
        })
      } else {
        throw ({ name: 404 })
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async delete (req, res, next) {
    try {
      const id = req.params.id
      const product = await Product.findByPk(id)
      if (product) {
        const response = await Product.destroy({ where: { id: id }})
        res.status(200).json({ message: 'delete success' })
      } else {
        throw ({ name: 404 })
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = Controller