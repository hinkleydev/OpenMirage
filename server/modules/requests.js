const requests = require('../requests.json');
const parameterRegex = /{[A-Z0-9]+}/gi; // Be able to parse arguments out of commands

// Return a list of options, just keys
function getAllOptions() {
    let options = []; let object; let key;

    for(let request in requests.options) {
        object = requests.options[request];
        key = Object.keys(object)[0];
        options.push(key); // Returning only the keys
    }
    return options;
}

// Return a specific option by key
function getOption(option) {
    let object;

    for(let request in requests.options) { // Iterate through options
        object = requests.options[request];
        if (object[option] != undefined) { // If we confirm this is the correct option, return the object
            return object;
        }
    }
    return null;
}

// Return an array of options
function getArguments(option) {
    const object = getOption(option); // The key is passed in so we get the object
    const key = Object.keys(object)[0]; 
    const command = object[key]; // Get the command
    const list = command.matchAll(parameterRegex);
    const arr = Array.from(list); // This pulls the parameters from the command
    let value; 
    let results = [];
    
    for(let item in arr) {
        value = arr[item][0]; // Convert from array to string
        results.push(value.slice(1, -1)) // Remove the brackets and add to the array
    }
    
    // Remove duplicates
    results = [...new Set(results)];
    
    return results;
}

module.exports = {
    getAllOptions,
    getOption,
    getArguments
}