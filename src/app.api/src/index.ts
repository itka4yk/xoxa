import path = require('path');

import express = require('express');

const app = express();

/**
 * API
 */

app.get('/api', (_, res) => res.send('Hello from api'));


/**
 * STATIC
 */

app.use('/', express.static(path.resolve(path.join(__dirname, '..', '/wwwroot'))));

app.get('*', (_, res) => res.sendFile(path.resolve(path.join(__dirname, '..', '/wwwroot/index.html'))));


app.listen(8080, () => console.log('Listening on port 8080'));
