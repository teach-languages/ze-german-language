const fs = require('fs');
const data = require('../data');

module.exports = () => {
    const dict = fs.readFileSync(data.dict.simple, 'utf8');
    const prepRaw = dict.match(/(?<=[\t\s\n])[a-zöäüß]+ \[\+(Akk\.|Dat\.|Gen\.)\](?=[\t\s\n])/g);

    const prepRawSort = [...new Set(prepRaw)];

    const prepositions = {};
    for(let i = 0; i < prepRawSort.length; i++) {
        let pcase = '';
        if(prepRawSort[i].includes('+Dat.')) {
            pcase = 'dative';
        } else if(prepRawSort[i].includes('+Akk.')) {
            pcase = 'accusative';
        } else if(prepRawSort[i].includes('+Gen.')) {
            pcase = 'genitive';
        }

        const prep = prepRawSort[i].split(' ')[0];

        if(prepositions[prep] === undefined) {
            prepositions[prep] = pcase;
        } else {
            prepositions[prep] = [prepositions[prep], pcase];
        }
    }

    fs.writeFileSync(data.prepositions.sp, JSON.stringify(prepositions));
};
