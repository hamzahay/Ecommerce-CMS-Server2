if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test'){
  require('dotenv').config();
}

const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use(routes)
app.use(errorHandler)

module.exports = app