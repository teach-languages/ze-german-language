module.exports = (req, res, next) => {
    Object.assign(res, {
        error(message) {
            res.json({ error: message });
        }
    });

    next();
};