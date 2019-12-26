const Word = require('./word');
const types = require('../types');
const lang = require('../../lang');

class Conjunction extends Word {
    type = types.word.CONJUNCTION;

    static test(word) {
        if(lang.conjunctions.list.includes(word.toLowerCase())) {
            return new Conjunction(word);
        }
    }

    constructor(word) {
        super(word);

        this.wordBase = this.lower;
    }
}

module.exports = Conjunction;