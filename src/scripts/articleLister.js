const fs = require('fs');
const data = require('../data');

module.exports = () => {
    const articles = JSON.parse(fs.readFileSync(data.articles.st, 'utf-8'));
    const list = [...Object.keys(articles.definite), ...Object.keys(articles.indefinite)];

    fs.writeFileSync(data.articles.list, JSON.stringify(list));
};