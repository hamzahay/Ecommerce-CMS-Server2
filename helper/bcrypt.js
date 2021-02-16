const bcrypt = require('bcrypt')
const saltRound = 10

function hashPass (password) {
  const salt = bcrypt.genSaltSync(saltRound)
  return bcrypt.hashSync(password, salt)
}

function comparePass (password, hashPass) {
  return bcrypt.compareSync(password, hashPass)
}

module.exports = { hashPass, comparePass}