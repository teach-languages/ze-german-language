const Word = require('./word');
const types = require('../types');

class Verb extends Word {
    type = types.word.VERB;

    constructor(word, ctx) {
        super(word, ctx);


    }
}

module.exports = Verb;