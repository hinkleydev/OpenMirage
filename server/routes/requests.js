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
    const requestObject = getOption(req.params.request);
    if (requestObject == null) {
        res.status(404).json({"error" : "item not found"})
        return;
    } // Reject if command doesn't exist

    let command = requestObject[req.params.request]; // Get the command string

    const expectedArguments = getArguments(req.params.request);
    for(let index of expectedArguments) {
        if(req.body[index] == undefined) {
            res.status(400).json({"error" : index + " not passed"})
        }
    } // Check all the expected arguments are there

    const formattedArguments = expectedArguments.map((argument) => "{" + argument + "}" ) // Readd the brackets to parse the command
    
    for(let index = 0; index < formattedArguments.length; index++) {
        command = command.replace(formattedArguments[index], req.body[expectedArguments[index]]);
        // Replace the template strings with the request arguments
    }
    const result = shell.exec(command, {silent: true}); // We can tell if something went wrong from the code here
    if (result.code == 0) {
        res.status(200).json({"result" : result.stdout});
    } else {
        res.status(500).json({"code" : result.code, "result" : result.stderr});
    }
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
    } // Reject if request doesn't exist

    const arguments = getArguments(req.params.request);
    let requestObject = {name: req.params.request, arguments};
    res.json(requestObject);
})

// --- UPDATE

// --- DELETE

module.exports = router