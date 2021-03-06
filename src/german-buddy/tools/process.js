const data = require('../../data');
const types = require('../types');
const lang = require('../../lang');
const word = require('../word');
const WordGroup = require('../wordgroup');

module.exports = {
    word(wordRaw) {
        let words = new WordGroup();

        for(let [key, type] of Object.entries(word)) {
            words.push(type.test(wordRaw));
        }

        if(words.length === 1) {
            [words] = words;
        } else if(!words.length) {
            return new word.Word(wordRaw);
        }
    
        return words;
    }
};