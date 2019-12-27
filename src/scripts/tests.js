const gb = require('../german-buddy');
const util = require('util');
const log = require('../logger');

module.exports = () => {
    const verb = gb.process.word('macht');
    log.m(util.inspect(verb, 3));

    const ich = gb.word.Pronoun.create(1, false);
    log.m(util.inspect(ich));

    log.m(verb.conjugate(ich, 'past'));

    log.m(util.inspect(verb.conjugationTable()));
};