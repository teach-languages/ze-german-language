const settings = require('../settings');
const log = require('../logger');
const express = require('express');

// Middleware
const respond = require('./tools/respond');
const verify = require('./tools/verify');

// Api endpoints
const word = require('./word');

// Create app
const app = express();
app.use(express.json());
app.use(respond);
app.use(verify);

// Route!
app.get('/info', (req, res) => {
    res.json(settings.info);
});
app.use('/word', word);

// Export the app only, as it will be started through the cli
module.exports = app;