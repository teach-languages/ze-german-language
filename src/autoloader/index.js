const fs = require('fs');
const path = require('path');
const settings = require('../settings');

function load(dir) {
    const obj = {};

    const files = fs.readdirSync(dir, { withFileTypes: true });
    for(let file of files) {
        if(file.isDirectory()) {
            obj[file.name] = load(`${dir}/${file.name}`);
        } else if(file.isFile()) {
            const parsedPath = path.parse(file.name);

            if(parsedPath.ext === '.json' || parsedPath.ext === '.js') {
                obj[parsedPath.name] = require(`${dir}/${file.name}`);
            }
        }
    }

    return obj;
}

global.requireDir = (dir) => {
    const directory = fs.existsSync(dir) ? dir : `${settings.projectRoot}/${dir}`;
    const mod = {
        ...load(path.resolve(directory))
    };

    return mod;
};