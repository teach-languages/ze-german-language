const fs = require('fs');
const data = require('../data');
const lang = require('../lang');

module.exports = () => {
    fs.writeFileSync(data.nouns.list, JSON.stringify(Object.keys(lang.nouns.sa)));
};