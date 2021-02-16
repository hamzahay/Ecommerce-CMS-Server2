function errorHandler (err, req, res, next) {
  const errName = err.name

  switch (errName) {
    case 401:
      res.status(401).json({ errors: err.message })
      break
    case 403:
      res.status(403).json({ errors: 'forbidden' })
      break
    case 404:
      res.status(404).json({ errors: 'not found' })
      break
    case 'SequelizeValidationError':
      res.status(400).json({ errors: err.message })
      break
  }
}

module.exports = errorHandler