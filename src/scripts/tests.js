const gb = require('../german-buddy');
const util = require('util');
const log = require('../logger');

module.exports = () => {
    const raw = 'Jetzt mal sehen wie du mit komplizierten Sätzen umgehst.';

    const sentence = new gb.Sentence(raw, gb.types.distinction.BASIC);
    log.m(util.inspect(sentence, 3));
};