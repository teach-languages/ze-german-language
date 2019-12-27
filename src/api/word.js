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
        switch(body.type) {
        case 'noun': {
            if(body.frequency) {
                const index = Math.floor(Math.random() * body.frequencyCap);
                const noun = Object.keys(lang.frequency.noun)[index];
        
                res.json(lang.frequency.noun[noun]);
            } else {
                const index = Math.floor(Math.random() * lang.nouns.list.length);
                const noun = lang.nouns.list[index];
        
                res.json(new gb.word.Noun(noun, ''));
            }
            break;
        }
        case 'verb': {
            if(body.frequency) {
                const index = Math.floor(Math.random() * body.frequencyCap);
                const verb = Object.keys(lang.frequency.verb)[index];
                const freqobj = lang.frequency.verb[verb];

                const verbResolved = gb.word.Verb.test(freqobj.word.wordBase);
        
                res.json({
                    ...freqobj,
                    conjugationTable: verbResolved.conjugationTable()
                });
            } else {
                const index = Math.floor(Math.random() * lang.verbs.list.length);
                const verb = lang.verbs.list[index];
        
                const verbResolved = gb.word.Verb.test(verb);
        
                res.json({
                    word: verbResolved,
                    conjugationTable: verbResolved.conjugationTable()
                });
            }
            break;
        }
        }
    } catch(e) {
        res.error('Internal Server Error');
    }
});

module.exports = word;