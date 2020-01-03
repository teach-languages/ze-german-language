const lang = require('../lang');
const settings = require('../settings');
const db = require('better-sqlite3')(settings.projectRoot + '/db/lang.db');

module.exports = () => {
    const insert = db.prepare(`INSERT INTO words (word, type, caseSensitive, person, plurality, gender, accusative, dative, substantial, reflexive, conjugation, genitive) 
                                VALUES (@word, @type, @caseSensitive, @person, @plurality, @gender, @accusative, @dative, @substantial, @reflexive, @conjugation, @genitive)`);

    const insertMany = db.transaction((objs) => {
        for (const obj of objs) {
            insert.run(obj);
        };
    });

    const arr = [];

    for(let [pronoun, value] of lang.pronouns.sp.personal) {
        arr.push({
            word: pronoun,
            type: 'pronoun',
            person: value.person,
            caseSensitive: value.caseSensitive ? 1 : 0,
            plurality: value.plurality,
            gender: value.gender,
            accusative: value.accusative,
            dative: value.dative,
            substantial: value.substantial,
            reflexive: value.reflexive,
            conjugation: JSON.stringify(value.conjugation),
            genitive: JSON.stringify(value.genitive)
        });
    }

    insertMany(arr);
};