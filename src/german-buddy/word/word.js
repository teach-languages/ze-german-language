const types = require('../types');

class Word {
    word = '';
    lower = '';

    wordBase = '';

    type = types.UNIDENTIFIED;
    gender = types.gender.NONE;
    plurality = types.plurality.SINGULAR;
    cases = [];
    modes = [];
    person = -1;
    accusative = '';
    dative = '';
    substantial = '';
    conjugation = {};
    genitive = {};
    caseSensitive = false;

    static test(word) {
        return undefined;
    }

    constructor(word) {
        // Create word
        this.word = word;
        this.wordBase = word;
        this.lower = word.toLowerCase();
    }
}

module.exports = Word;