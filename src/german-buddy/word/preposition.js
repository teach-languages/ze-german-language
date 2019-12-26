const Word = require('./word');
const types = require('../types');
const lang = require('../../lang');

class Preposition extends Word {
    type = types.word.PREPOSITION;

    static test(word) {
        if(lang.prepositions.sp[word.toLowerCase()]) {
            return new Preposition(word);
        }
    }

    constructor(word) {
        super(word);

        this.wordBase = this.lower;
        this.cases = lang.prepositions.sp[this.wordBase];
    }
}

module.exports = Preposition;