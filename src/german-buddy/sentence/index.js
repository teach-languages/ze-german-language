const process = require('../tools/process');
const settings = require('../../settings');

class Sentence {
    sentence = '';
    parts = [];

    constructor(sentence) {
        this.sentence = sentence;

        const words = this.sentence.match(settings.regex.word);

        // TODO: Check if actually proper sentence...

        if(words) {
            for(let word of words) {
                this.parts.push(process.word(word));
            }
        }
    }
};

module.exports = Sentence;