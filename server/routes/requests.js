const express = require('express')
const router = express.Router()
const requests = require('../requests.json');
// The best course of action might be using an external file to get this info

// --- CREATE

/**
 * POST /request:request
 * Act on a request
 */
router.post('/:request', (req, res) => {
    // Code
})

// --- READ

/**
 * GET /requests
 * Return a list of all possible requests to make
 */
router.get('/', (req, res) => {
    // Code
})

/**
 * GET /requests/:request
 * Return details of a specific request and how to make it
 */
router.get('/:request', (req, res) => {
    // Code
})

// --- UPDATE

// --- DELETE

module.exports = router