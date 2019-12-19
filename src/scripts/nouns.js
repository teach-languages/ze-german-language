// TODO: Sort out plurals that have duplicates in other genders
const fs = require('fs');
const data = require('../data');
const log = require('../logger');

module.exports = () => {
    const dict = fs.readFileSync(data.dict.simple, 'utf8');

    const masculine = dict.match(/[a-zA-ZäüößÄÜÖ]+\-?[a-zA-ZäüößÄÜÖ]+ {m}/g);
    const feminine = dict.match(/[a-zA-ZäüößÄÜÖ]+\-?[a-zA-ZäüößÄÜÖ]+ {f}/g);
    const neutral = dict.match(/[a-zA-ZäüößÄÜÖ]+\-?[a-zA-ZäüößÄÜÖ]+ {n}/g);
    const plural = dict.match(/[a-zA-ZäüößÄÜÖ]+\-?[a-zA-ZäüößÄÜÖ]+ {pl}/g);

    log.m(`Found ${masculine.length + feminine.length + neutral.length + plural.length} entries...`);

    const words = {
        masculine: Array.from(new Set(masculine)).filter(e => e.toLowerCase() !== e),
        feminine: Array.from(new Set(feminine)).filter(e => e.toLowerCase() !== e),
        neutral: Array.from(new Set(neutral)).filter(e => e.toLowerCase() !== e),
        plural: Array.from(new Set(plural)).filter(e => e.toLowerCase() !== e)
    };

    for(let i = 0; i < words.masculine.length; i++) words.masculine[i] = words.masculine[i].split(' ')[0];
    for(let i = 0; i < words.feminine.length; i++) words.feminine[i] = words.feminine[i].split(' ')[0];
    for(let i = 0; i < words.neutral.length; i++) words.neutral[i] = words.neutral[i].split(' ')[0];
    for(let i = 0; i < words.plural.length; i++) words.plural[i] = words.plural[i].split(' ')[0];

    words.masculine.sort();
    words.feminine.sort();
    words.neutral.sort();
    words.plural.sort();

    const wordcount = words.masculine.length + words.feminine.length + words.neutral.length + words.plural.length;

    log.m(`Found ${wordcount} words...\n`);

    log.m(`Masculine:\t ${words.masculine.length} - ${Math.floor((words.masculine.length/wordcount)*100)}%`);
    log.m(`Feminine:\t ${words.feminine.length} - ${Math.floor((words.feminine.length/wordcount)*100)}%`);
    log.m(`Neutral:\t ${words.neutral.length} - ${Math.floor((words.neutral.length/wordcount)*100)}%`);
    log.m(`Plural:\t\t ${words.plural.length} - ${Math.floor((words.plural.length/wordcount)*100)}%`);

    log.m('Writing nouns-sg.json...');
    fs.writeFileSync(data.nouns.sg, JSON.stringify(words));

    const wordsSa = {};
    for(let gender of Object.keys(words)) {
        for(let word of words[gender]) {
            if(wordsSa[word] == undefined) {
                wordsSa[word] = gender;
            } else {
                if(Array.isArray(wordsSa[word])) {
                    wordsSa[word].push(gender);
                } else {
                    wordsSa[word] = [wordsSa[word], gender];
                }
            }
        }
    }

    log.m('Writing nouns-sa.json...');
    fs.writeFileSync(data.nouns.sa, JSON.stringify(wordsSa));
};