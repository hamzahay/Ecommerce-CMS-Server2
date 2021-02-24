const { verifyToken } = require('../helper/jwt')
const { User, Cart } = require('../models')

async function authenticate (req, res, next) {
  try {
    if (!req.headers.access_token) throw ({ name: 401, message: 'please login first' }) //{
    const payload = verifyToken(req.headers.access_token)
    const user = await User.findOne({ where: { email: payload.email }})
    if (user) {
      req.user = user
      next()
    } else {
      throw ({ name: 401, message: 'unauthorize' })
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

function authorize (req, res, next) {
  try {
    const role = req.user.role
    if (role === 'admin') {
      next()
    } else {
      throw ({ name: 403 })
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function cartAuthorize (req, res, next) {
  try {
    const id = req.params.id
    console.log(id, 'from auth')
    const user = req.user
    const cart = await Cart.findOne({ where: { id }})
    if (cart) {
      if (cart.UserId == user.id) {
        next()
      } else {
        throw ({ name: 403 })
      }
    } else {
      throw ({ name: 404 })
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = { authenticate, authorize, cartAuthorize }