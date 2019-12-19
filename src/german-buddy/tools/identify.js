const data = require('../../data');
const types = require('../types');

const articlesList = require(data.articles.list);
const pronounsList = require(data.pronouns.list);
const prepositions = require(data.prepositions.sp);
const verbobj = require(data.verbs.listobj);
const nounsSa = require(data.nouns.sa);

// Try to do a basic identification of the word (no context)
function basic(word) {
    const lower = word.toLowerCase();

    if(articlesList.includes(lower)) {
        return types.word.ARTICLE;
    } else if(pronounsList.includes(lower)) {
        return types.word.PRONOUN;
    } else if(Object.keys(prepositions).includes(lower)) {
        return types.word.PREPOSITION;
    } else if(verbobj[lower]) {
        return types.word.VERB;
    } else if(nounsSa[word] !== undefined) {
        return types.word.NOUN;
    } 

    return types.UNIDENTIFIED;
}

module.exports = { basic };