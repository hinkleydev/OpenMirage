const apiUrl = "http://localhost:4000/requests"; // I know, it's a sin, but it's only for development

async function getOptions() {
    const result = await fetch(apiUrl);
    //console.log(result)
    const json = await result.json();
    //console.log(json);
    return json;
}

//async function getArguments(option) {
//
//}

module.exports = {
    getOptions
}