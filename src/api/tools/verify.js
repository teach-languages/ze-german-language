// Keeping this API safe since well not really that long

module.exports = (req, res, next) => {
    Object.assign(req, {
        verify(schema) {
            const body = {};

            for(let [key, val] of Object.entries(schema)) {
                try {
                    const parameter = req.body[key] === undefined ? val.default : req.body[key];
                    body[key] = val.type(parameter);
                } catch(e) {
                    res.error('Invalid request');
                    return false;
                }
            }

            return body;
        }
    });

    next();
};