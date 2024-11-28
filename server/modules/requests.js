const requests = require('../requests.json');

// Return a list of options, just keys
function getAllOptions() {
    let options = []; let object; let key;
    for(let request in requests.options) {
        object = requests.options[request];
        key = Object.keys(object)[0];
        options.push(key);
    }
    return options;
}

// Return a specific option by key
function getOption(option) {
    let object; let returnValue;
    for(let request in requests.options) {
        object = requests.options[request];
        if (object[option] != undefined) {
            return object;
        }
    }
    return null;
}

module.exports = {
    getAllOptions,
    getOption
}