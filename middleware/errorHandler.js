function errorHandler (err, req, res, next) {
  const errName = err.name

  switch (errName) {
    case 401:
      res.status(401).json({ errors: err.message })
      break
    case 403:
      res.status(403).json({ errors: 'forbidden' })
      break
  }
}

module.exports = errorHandler