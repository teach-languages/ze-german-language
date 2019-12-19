const word = require('../word');
const types = require('../types');
const identify = require('./identify');

module.exports = {
    word(wordRaw, ctx = '') {
        // Determine type
        const type = identify.basic(wordRaw);

        switch(type) {
        case types.word.NOUN: {
            return new word.Noun(wordRaw, ctx);
        }
        case types.word.VERB: {
            return new word.Verb(wordRaw, ctx);
        }
        default: {
            return new word.Word(wordRaw, ctx);
        }
        }
    }
};