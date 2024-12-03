const apiUrl = "http://localhost:4000/requests"; // I know, it's a sin, but it's only for development

// Get a list of commands a user can make
async function getCommands() {
    const result = await fetch(apiUrl);
    //console.log(result)
    const json = await result.json();
    //console.log(json);
    return json;
}

// Returns an array of arguments for a required command
async function getArguments(option) {
    const result = await fetch(apiUrl + "/" + option);
    const json = await result.json();
    return json["arguments"];
}

// Submit a request for a command to be done
async function performRequest(option, data) {
    const result = await fetch(apiUrl + "/" + option, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const json = await result.json();
    return json;
}

module.exports = {
    getCommands,
    getArguments,
    performRequest
}