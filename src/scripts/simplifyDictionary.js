const fs = require('fs');
const data = require('../data');

module.exports = () => {
    const dict = fs.readFileSync(data.dict.full, 'utf8');
    const lines = dict.split('\n');
    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].split('\t')[0];
    }

    fs.writeFileSync(data.dict.simple, lines.join('\n'));
};