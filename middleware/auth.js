const { verifyToken } = require('../helper/jwt')
const { User, Product } = require('../models')

async function authenticate (req, res, next) {
  try {
    if (!req.headers.access_token) throw ({ name: 401, message: 'please login first' }) //{
    const payload = verifyToken(req.headers.access_token)
    const user = await User.findOne({ where: { email: payload.email }})
    if (user) {
      next()
    } else {
      throw ({ name: 401, message: 'unauthorize' })
    }
    //} else {
      //throw ({ name: 401, message: 'please login first' })
    //}
  } catch (err) {
    console.log(err)
    next(err)
  }
}

function authorize (req, res, next) {
  try {
    const payload = verifyToken(req.headers.access_token)
    if (payload.role === 'admin') {
      next()
    } else {
      throw ({ name: 403 })
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = { authenticate, authorize }