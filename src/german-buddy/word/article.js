const Word = require('./word');
const lang = require('../../lang');
const types = require('../types');

class Article extends Word {
    type = types.word.ARTICLE;

    static test(word) {
        if(lang.articles.list.includes(word.toLowerCase())) {
            return new Article(word);
        }
    }

    constructor(word) {
        super(word);

        this.wordBase = this.lower;
    }
}

module.exports = Article;