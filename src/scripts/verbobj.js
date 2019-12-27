const data = require('../data');
const lang = require('../lang');
const fs = require('fs');

module.exports = () => {
    const obj = {};
    for (let verb of lang.verbs.list) {
        obj[verb] = 1;
    }

    fs.writeFileSync(data.verbs.listobj, JSON.stringify(obj));
};