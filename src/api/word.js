const express = require('express');
const data = require('../data');
const log = require('../logger');
const lang = require('../lang');
const gb = require('../german-buddy');

const word = express.Router();

const schema = {
    type: {
        type: String,
        default: 'noun'
    },
    frequency: {
        type: Boolean,
        default: true
    },
    frequencyCap: { 
        type: Number,
        default: 1000
    }
};
word.all('/', (req, res) => {
    const body = req.verify(schema);
    try {
        if(body.frequency) {
            const index = Math.floor(Math.random() * body.frequencyCap);
            const noun = Object.keys(lang.frequency.noun)[index];

            res.json(lang.frequency.noun[noun]);
        } else {
            const keys = Object.keys(lang.nouns.sa);
            const index = Math.floor(Math.random() * keys.length);
            const noun = keys[index];

            res.json(new gb.word.Noun(noun, ''));
        }
    } catch(e) {
        res.error('Internal Server Error');
    }
});

module.exports = word;