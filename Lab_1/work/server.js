const express = require('express');
const log = require('./libs/log')(module);
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const app = express();

app.use(favicon('./favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', function (req, res) {
    res.send('API is running');
});

app.listen(1337, function () {
    log.info('Express server listening on port 1337');
});

app.get('/ErrorExample', function (req, res, next) {
    next(new Error('Random error!'));
});

app.get('/api/articles', function (req, res) {
    res.send('This is not implemented now');
});

app.post('/api/articles', function (req, res) {
    res.send('This is not implemented now');
});

app.get('/api/articles/:id', function (req, res) {
    res.send('This is not implemented now');
});

app.put('/api/articles/:id', function (req, res) {
    res.send('This is not implemented now');
});

app.delete('/api/articles/:id', function (req, res) {
    res.send('This is not implemented now');
});

app.use(function (req, res, next) {
    res.status(404);
    log.debug('Not found URL: %s', req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    log.error('Internal error(%d): %s', res.statusCode, err.message);
    res.send({ error: err.message });
    return;
});