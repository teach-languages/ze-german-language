const Word = require('./word');
const types = require('../types');
const lang = require('../../lang');

class Verb extends Word {
    type = types.word.VERB;

    conjugationTable() {
        const table = {
            verb: this.wordBase,
            present: [],
            past: [],
            conjunctive: [],
            imperative: []
        };

        for(let [pron, body] of lang.pronouns.sp.personal) {
            for(let [tense, ending] of Object.entries(body.conjugation)) {
                table[tense].push([pron, this.wordBase.replace(/en$/, ending)]);
            }
        }

        return table;
    }

    conjugate(pronoun, tense) {
        if(this.irregular) {
            return lang.verbs.irrsv[this.wordBase][tense][pronoun.plurality][`${pronoun.person}`];
        } else {
            return this.wordBase.replace(/en$/, pronoun.conjugation[tense]);
        }
    }

    getBase() {
        // Check irregulars
        for(let [key, value] of Object.entries(lang.verbs.irrsv)) {
            if(JSON.stringify(value).includes(this.lower)) {
                this.irregular = true;
                return key;
            }
        }

        // Check if it's a participle
        if(this.lower.startsWith('ge') && this.lower.endsWith('t')) {
            return this.lower.slice(2, -1) + 'en';
        }

        // Check regular conjugation endings
        for(let ending of lang.pronouns.conjendings) {
            if(this.lower.endsWith(ending)) {
                const sliced = this.lower.slice(0, this.lower.lastIndexOf(ending)) + 'en';
                if(lang.verbs.listobj[sliced]) {
                    return sliced;
                }
            }
        }

        return this.lower;
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