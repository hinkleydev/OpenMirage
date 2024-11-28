const express = require('express')
const router = express.Router()

// GET /requests
router.get('/', (req, res) => {
    res.send("Working!")
})

module.exports = router