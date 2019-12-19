const gb = require('../german-buddy');
const data = require('../data');
const log = require('../logger');

module.exports = () => {
    log.m('Starting frequency analysis...');

    gb.analysis.wordFrequency({ 
        dir: data.corpora, 
        recursive: true,
        out: data.frequency + '/frequency.noun.json',
        types: ['noun'],
        limit: 1000
    }).then(() => {
        log.m('Frequency analysis completed...');
    });
};