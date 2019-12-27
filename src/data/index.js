const settings = require('../settings');

module.exports = {
    corpora: settings.projectRoot + '/corpora',
    dict: {
        full: settings.projectRoot + '/dict/full.txt',
        simple: settings.projectRoot + '/dict/simple.text'
    },
    articles: {
        list: settings.projectRoot + '/lang/articles/list.json',
        st: settings.projectRoot + '/lang/articles/st.json'
    },
    frequency: settings.projectRoot + '/lang/frequency',
    nouns: {
        sa: settings.projectRoot + '/lang/nouns/sa.json',
        sg: settings.projectRoot + '/lang/nouns/sg.json',
        list: settings.projectRoot + '/lang/nouns/list.json'
    },
    prepositions: {
        sp: settings.projectRoot + '/lang/prepositions/sp.json'
    },
    pronouns: {
        list: settings.projectRoot + '/lang/pronouns/list.json',
        sp: settings.projectRoot + '/lang/pronouns/sp.json',
        conjendings: settings.projectRoot + '/lang/pronouns/conjendings.json'
    },
    verbs: {
        irrsv: settings.projectRoot + '/lang/verbs/irrsv.json',
        list: settings.projectRoot + '/lang/verbs/list.json',
        listobj: settings.projectRoot + '/lang/verbs/listobj.json'
    }
};