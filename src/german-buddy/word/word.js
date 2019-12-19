const types = require('../types');

class Word {
    word = '';
    lower = '';

    wordBase = ''

    context = '';

    type = types.UNIDENTIFIED;
    gender = types.gender.NONE;
    plurality = types.plurality.SINGULAR;
    cases = [];
    modes = [];
    person = -1;
    accusative = '';
    dative = '';
    substantial = '';
    conjugation = '';
    genitive = {};

    constructor(word, ctx) {
        // Create word
        this.word = word;
        this.lower = word.toLowerCase();

        // Create context
        this.context = ctx;
    }
}

module.exports = Word;