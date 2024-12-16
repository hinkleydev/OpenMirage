const https = require('https');
const config = require('./package.json');

const options = {
    hostname: 'api.github.com',
    path: '/repos/hinkleydev/OpenMirage/tags',
    method: 'GET',
    headers: {
        'User-Agent': 'node.js'
    }
};

https.get(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        const tags = JSON.parse(data);
        const onlyTags = tags.map(tag => tag.name);
        if (onlyTags[0] == config.version) {
            console.log(`Version ${config.version} is up to date.`);
        } else {
            console.log(`Version ${config.version} is out of date. Latest version is ${onlyTags[0]}. Update by running 'npm run update'`);
        }
    });
}).on('error', (e) => {
    console.error(e);
});