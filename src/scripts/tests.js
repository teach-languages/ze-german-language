const gb = require('../german-buddy');
const util = require('util');
const log = require('../logger');

module.exports = () => {
    //const sentence = new gb.Sentence('Ich bin ein Mann', gb.types.distinction.BASIC);
    //log.m(util.inspect(sentence, 3));

    const verb = gb.process.word('gemacht');
    console.log(verb);
};