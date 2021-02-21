if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test'){
  require('dotenv').config();
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('../routes')
const cors = require('cors')
const errorHandler = require('../middleware/errorHandler')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res, next) => {
  res.json({ message: 'welcome to CEMES SERVER' })
})
app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('running on port : ', PORT)
})