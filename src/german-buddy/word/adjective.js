const Word = require('./word');
const lang = require('../../lang');
const types = require('../types');

class Adjective extends Word {
    type = types.word.ADJECTIVE;

    static test(word) {
        
    }

    constructor(word) {
        super(word);

        this.wordBase = this.lower;
    }
}

module.exports = Adjective;