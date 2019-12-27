const Word = require('./word');
const lang = require('../../lang');
const types = require('../types');

class Adverb extends Word {
    type = types.word.ADVERB;

    static test(word) {
        if(lang.adverbs.list.includes(word.toLowerCase())) {
            return new Adverb(word);
        }
    }

    constructor(word) {
        super(word);

        this.wordBase = this.lower;
    }
}

module.exports = Adverb;