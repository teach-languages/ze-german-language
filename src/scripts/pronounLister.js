const fs = require('fs');
const data = require('../data');

module.exports = () => {
    const pronouns = JSON.parse(fs.readFileSync(data.pronouns.sp, 'utf-8')).personal;

    const list = [];
    for(let [pronoun, body] of Object.entries(pronouns)) {
        list.push(...[
            pronoun, 
            body.accusative, 
            body.dative, 
            ...(body.substantial ? [body.substantial] : []),
            ...Object.keys(body.genitive)
        ]);
    }

    fs.writeFileSync(data.pronouns.list, JSON.stringify(list));
};