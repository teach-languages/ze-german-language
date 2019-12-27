const Word = require('./word');
const types = require('../types');
const lang = require('../../lang');

class Verb extends Word {
    type = types.word.VERB;

    conjugationTable() {
        const table = {
            verb: this.wordBase,
            present: {},
            past: {},
            conjunctive: {},
            imperative: {}
        };

        for(let [pron, body] of lang.pronouns.sp.personal) {
            for(let [tense, ending] of Object.entries(body.conjugation)) {
                table[tense][pron] = this.wordBase.replace(/en$/, ending);
            }
        }

        return table;
    }

    conjugate(pronoun, tense) {
        return this.wordBase.replace(/en$/, pronoun.conjugation[tense]);
    }

    getBase() {
        if(this.lower.endsWith('en')) {
            return this.lower;
        }

        for(let ending of lang.pronouns.conjendings) {
            if(this.lower.endsWith(ending)) {
                return this.lower.replace(new RegExp(ending + '$'), 'en');
            }
        }
    }

    static test(word) {
        const verb = new Verb(word);

        if(lang.verbs.listobj[verb.wordBase]) {
            return verb;
        }
    }

    constructor(word) {
        super(word);

        this.wordBase = this.getBase();
    }
}

module.exports = Verb;