const gb = require('../german-buddy');
const util = require('util');
const log = require('../logger');

module.exports = () => {
    const sentence = new gb.Sentence('Simon lutscht Pimmel');
    log.m(util.inspect(sentence, true));

    //log.m(util.inspect(gb.process.word('Mann'), 3));
};