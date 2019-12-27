const process = require('../tools/process');
const settings = require('../../settings');
const types = require('../types');
const Wordgroup = require('../wordgroup');

const priorityList = [
    types.word.ARTICLE,
    types.word.PRONOUN,
    types.word.PREPOSITION,
    types.word.CONJUNCTION,
    types.word.ADVERB,
    types.word.ADJECTIVE,
    types.word.VERB,
    types.word.NOUN
];

class Sentence {
    sentence = '';
    parts = [];

    constructor(sentence, distinctionType = 'none') {
        this.sentence = sentence;

        const words = this.sentence.match(settings.regex.word);

        // TODO: Check if actually proper sentence...

        if(words) {
            for(let word of words) {
                this.parts.push(process.word(word));
            }
        }

        switch(distinctionType) {
            case types.distinction.BASIC: {
                for(let i = 0; i < this.parts.length; i++) {
                    if(this.parts[i] instanceof Wordgroup) {
                        for(let priority of priorityList) {
                            for(let y = 0; y < this.parts[i].length; y++) {
                                if(this.parts[i][y].type = priority) {
                                    this.parts[i] = this.parts[i][y];
                                }
                            }
                        }
                    }
                }
                break;
            }
        }
    }
}

module.exports = Sentence;