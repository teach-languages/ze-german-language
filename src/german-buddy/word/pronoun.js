const Word = require('./word');
const types = require('../types');
const lang = require('../../lang');
const WordGroup = require('../wordgroup');

class Pronoun extends Word {
    type = types.word.PRONOUN;

    static create(person = 1, plural = false) {
        for(let [pron, body] of lang.pronouns.sp.personal) {
            if(body.person === person && body.plural === plural) {
                const pronoun = new Pronoun(pron);
                Object.assign(pronoun, body);
                
                return pronoun;
            }
        }

        return false;
    }

    static test(word) {
        const lower = word.toLowerCase();
        if(lang.pronouns.list.includes(lower)) {
            const pronouns = new WordGroup();

            for(let [pronoun, val] of lang.pronouns.sp.personal) {
                if(lower === pronoun
                    || lower === val.accusative
                    || lower === val.dative
                    || lower === val.substantial
                    || lower === val.reflexive
                    || Object.keys(val.genitive).includes(lower)) {
                        const pronounBase = new Pronoun(pronoun);
                        pronounBase.word = word;
                        pronounBase.lower = lower;

                        Object.assign(pronounBase, val);

                        /*pronounBase.person = val.person;
                        pronounBase.plural = val.plural;
                        pronounBase.gender = val.gender;
                        pronounBase.accusative = val.accusative;
                        pronounBase.substantial = val.substantial;
                        pronounBase.reflexive = val.reflexive;
                        pronounBase.conjugation = val.conjugation;
                        pronounBase.genitive = val.genitive;*/

                        pronouns.push(pronounBase);
                    }
            }

            if(pronouns.length > 1) {
                return pronouns;
            } else if(pronouns.length) {
                return pronouns[0];
            }
        }
    }

    constructor(word) {
        super(word);

        this.wordBase = this.lower;
    }
}

module.exports = Pronoun;