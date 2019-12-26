module.exports = {
    regex: {
        sentence: /((?<=[\.!?'"„:]+\s)|^)[\s,a-zA-ZüäößÜÄÖ\-–„“"…\d\(\)]+[\.!?'"“:]+/g,
        word: /\b[a-zA-ZüöäßÜÖÄ-]+\b/g
    }
};