const settings = require('../settings');

module.exports = {
    timestamp() {
        const now = new Date();
        return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    },
    m(message) {
        if(settings.verbose) {
            // eslint-disable-next-line no-console
            console.log(`${this.timestamp()}\t${message}`);
        }
    }
};