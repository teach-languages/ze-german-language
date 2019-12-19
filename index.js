const cla = require('command-line-args');
const path = require('path');
const settings = require('./src/settings');
const log = require('./src/logger');
const config = require('./config.json');
const info = require('./info.json');
const autoloader = require('./src/autoloader');

// Command line arguments
const arguments = [
    { name: 'production', alias: 'p', type: Boolean },
    { name: 'run', alias: 'r', type: String },
    { name: 'verbose', alias: 'v', type: Boolean }
];

const options = cla(arguments);

// Set settings
Object.assign(settings, {
    projectRoot: path.resolve(__dirname),
}, info, config, options);

// Load modules
log.m('Loading api...');
const api = require('./src/api');

log.m('Loading scripts...');
const scripts = requireDir('./src/scripts');

log.m('ze-german-language initialized...');

// Run command
switch(options.run) {
    case 'api': {
        api.listen(settings.api.port, () => {
            log.m(`API started on port ${settings.api.port}`);
        });
        break;
    }
    default: {
        if(scripts[options.run]) {
            scripts[options.run]();
        }
        break;
    }
}