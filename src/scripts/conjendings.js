const lang = require('../lang');
const fs = require('fs');
const data = require('../data');

module.exports = () => {
    const endings = [];
    for(let [pronoun, body] of lang.pronouns.sp.personal) {
        endings.push(...Object.values(body.conjugation));
    }

    fs.writeFileSync(data.pronouns.conjendings, JSON.stringify(Array.from(new Set(endings)).filter(e => e)));
};