// load environment variables from .env or elsewhere
require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

// Allow CORS requests
app.use(cors())

// parsing middleware for form input data & json
app.use(express.json())

// api router
app.use('/requests', require('./routes'))

// serve up static files (e.g. html and css files)
app.use(express.static(path.join(__dirname, '../build')))

// 404 handler
app.use((req, res) => {
  res.status(404).send({ error: '404 - Not Found', message: 'No route found for the requested URL' })
})

// error handling middleware
app.use((error, req, res, next) => {
  console.error('SERVER ERROR: ', error)
  if (res.statusCode < 400) res.status(500)
  res.send({ error: error.message, name: error.name, message: error.message, table: error.table })
})

module.exports = app