const express = require('express')
const router = express.Router()

router.use('/', require('./requests'))

module.exports = router