const express = require('express')
const { getAllOptions, getOption, getArguments } = require('../modules/requests')
const router = express.Router()
const shell = require("shelljs")

// The best course of action might be using an external file to get this info

// --- CREATE

/**
 * POST /requests/:request
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
    res.json(getAllOptions())
})

/**
 * GET /requests/:request
 * Return details of a specific request and how to make it
 */
router.get('/:request', (req, res) => {
    if (getOption(req.params.request) == null) {
        res.status(404).json({"error" : "item not found"})
        return;
    }
    const arguments = getArguments(req.params.request);
    let requestObject = {name: req.params.request, arguments};
    res.json(requestObject);
})

// --- UPDATE

// --- DELETE

module.exports = router