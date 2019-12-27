const gb = require('../german-buddy');
const data = require('../data');
const log = require('../logger');

module.exports = () => {
    log.m('Starting frequency analysis...');

    gb.analysis.wordFrequency({ 
        dir: data.corpora + '/30tausend', 
        recursive: true,
        out: data.frequency + '/all.json',
        //types: ['verb'],
        limit: 1000
    }).then(() => {
        log.m('Frequency analysis completed...');
    });
};