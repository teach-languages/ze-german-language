const Word = require('./word');
const types = require('../types');
const data = require('../../data');

const nounsSa = require(data.nouns.sa);

function noun_bases(noun) {
    return Array.from(new Set([
        ...(noun.endsWith('e') ? [noun.slice(0, -1)] : []),
        ...(noun.endsWith('n') ? [noun.slice(0, -1)] : []),
        ...(noun.endsWith('en') ? [noun.slice(0, -2)] : []),
        ...(noun.endsWith('er') ? [noun.slice(0, -2)] : []),
        ...(noun.endsWith('ern') ? [noun.slice(0, -3)] : []),

        ...(noun.includes('äu') ? noun_bases(noun.replace('äu', 'au')) : []),
        ...(noun.includes('ä') ? noun_bases(noun.replace('ä', 'a')) : [])
    ]));
}

class Noun extends Word {
    type = types.word.NOUN;

    bases() {
        return noun_bases(this.word);
    }

    depluralize() {
        this.plurality = types.plurality.PLURAL;
        this.gender = types.gender.FEMININE;

        for (let base of this.bases()) {
            const gender = nounsSa[base];
            if (gender !== undefined && gender !== types.gender.PLURAL) {
                this.wordBase = base;
                this.gender = gender;
                this.plurality = types.plurality.SINGULAR;

                break;
            }
        }
    }

    constructor(word, ctx) {
        super(word, ctx);

        // Identify Gender
        this.gender = nounsSa[this.word];
        this.person = 3;
        this.wordBase = this.word;

        // Depluralize if plural
        if (this.gender.includes(types.gender.PLURAL)) {
            this.depluralize();
        }
    }
}

module.exports = Noun;