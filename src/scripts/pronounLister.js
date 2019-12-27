const fs = require('fs');
const data = require('../data');
const lang = require('../lang');

module.exports = () => {
    const list = [...lang.pronouns.sp.impersonal];
    for(let [pronoun, body] of lang.pronouns.sp.personal) {
        list.push(...[
            pronoun, 
            body.accusative, 
            body.dative, 
            body.reflexive,
            ...(body.substantial ? [body.substantial] : []),
            ...Object.keys(body.genitive)
        ]);
    }

    fs.writeFileSync(data.pronouns.list, JSON.stringify(Array.from(new Set(list))));
};