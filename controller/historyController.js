const { History } = require('../models')

class Controller {

  static async getHistories (req, res, next) {
    try {
      const UserId = req.user.id
      const histories = await History.findAll({ where: { UserId }})
      res.status(200).json(histories)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = Controller