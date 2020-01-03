const process = require('../tools/process');
const settings = require('../../settings');
const types = require('../types');
const WordGroup = require('../wordgroup');

const priorityList = [
    types.word.ARTICLE,
    types.word.PRONOUN,
    types.word.PREPOSITION,
    types.word.CONJUNCTION,
    types.word.ADVERB,
    types.word.ADJECTIVE,
    types.word.VERB,
    types.word.NOUN,
    types.UNIDENTIFIED
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
                const parts = [];

                for(let part of this.parts) {
                    if(part instanceof WordGroup) {
                        for(let priority of priorityList) {
                            if(part.some(e => e.type === priority)) {
                                parts.push(part.find(e => e.type === priority));
                                break;
                            }
                        }
                    } else {
                        parts.push(part);
                    }
                }

                this.parts = parts;
                break;
            }
        }
    }
}

module.exports = Sentence;