const fs = require('fs');
const data = require('../data');
const log = require('../logger');

module.exports = () => {
    const dict = fs.readFileSync(data.dict.simple, 'utf8');
    const verbsLookup = dict.match(/(?<=[\t\s\n])[a-zöäüß]+n(?=[\t\s\n])/g);

    const verbs = [...new Set(verbsLookup)];

    log.m(`Found ${verbs.length} verbs...`);

    fs.writeFileSync(data.verbs.list, JSON.stringify(verbs));

    const obj = {};

    for (let verb of verbs) {
        obj[verb] = 1;
    }

    fs.writeFileSync(data.verbs.listobj, JSON.stringify(obj));
};