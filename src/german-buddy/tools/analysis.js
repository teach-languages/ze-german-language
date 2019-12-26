const fs = require('fs');
const process = require('./process');
const log = require('../../logger');
const settings = require('../../settings');
const Sentence = require('../sentence');
const WordGroup = require('../wordgroup');

function textFrequency(path, freq, types) {
    log.m(`Analyzing ${path}...`);

    const text = fs.readFileSync(path, 'utf-8');
    const sentences = text.match(settings.regex.sentence);

    if(!sentences) return;

    for(let sentenceRaw of sentences) {
        const parsedSentence = new Sentence(sentenceRaw);

        for(let part of parsedSentence.parts) {
            if(part instanceof WordGroup || !types.includes(part.type)) continue;

            if(freq[part.wordBase]) {
                freq[part.wordBase].count++;
            } else {
                freq[part.wordBase] = {
                    count: 1,
                    ...part,
                    context: parsedSentence.sentence
                };
            }
        }
    }
}

function getAllPaths(dir, recursive) {
    const paths = fs.readdirSync(dir, { withFileTypes: true });
    const files = [];
    for(let path of paths) {
        if(path.isDirectory()) {
            if(!recursive) continue;

            const newPaths = fs.readdirSync(`${path.base || dir}/${path.name}`, { withFileTypes: true });
            newPaths.filter(e => e.isDirectory()).forEach((e,i,a) => { a[i].base = path.base || dir; paths.push(a[i]); });
            newPaths.filter(e => e.isFile()).forEach(e => { files.push(`${path.base || dir}/${path.name}/${e.name}`); });
        } else {
            files.push(`${path.base || dir}/${path.name}`);
        }
    }

    return files;
}

function sortedArray(obj, limit) {
    const sortedObj = {};
    Object.entries(obj).sort((a, b) => b[1].count - a[1].count).filter(item => item[1].count > 0).slice(0,limit).forEach(e => sortedObj[e[0]] = e[1]);
    return sortedObj;
}

module.exports = {
    async wordFrequency({ strict, dir, recursive, path, out, types, limit }) {
        const start = Date.now();
        log.m('Starting frequency analysis...');

        const frequency = {};

        if(path) {
            textFrequency(path, frequency, types);
        } else if(dir) {
            log.m('Getting paths...');
            const paths = getAllPaths(dir, recursive || false);
            log.m('Analyzing...');
            for(let text of paths) {
                textFrequency(text, frequency, types);
            }
        }

        log.m('Sorting and writing...');
        fs.writeFileSync(out || `out/frequency.${(types && types.join('_')) || 'all'}.${Date.now()}.json`, JSON.stringify(sortedArray(frequency, limit || 1000), null, 4));

        log.m(`Done in ${Date.now() - start}ms...`);
    }
};