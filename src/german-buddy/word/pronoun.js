const Word = require('./word');
const types = require('../types');
const lang = require('../../lang');
const WordGroup = require('../wordgroup');

class Pronoun extends Word {
    type = types.word.PRONOUN;

    static create(person = 1, plurality = types.plurality.SINGULAR) {
        for(let [pron, body] of lang.pronouns.sp.personal) {
            if(body.person === person && body.plurality === plurality) {
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
            
            if(JSON.stringify(lang.pronouns.sp.personal).includes(lower)) {
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
    
                        pronouns.push(pronounBase);
                    }
                }
            } else {
                pronouns.push(new Pronoun(lower));
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