"use strict";

let express = require('express');
let http    = require('http');

let app = express();

let server = http.createServer(app);

function start(port, callback) {

    app.use(express.static('public'))

    server.listen(port, callback);
}

start(Number(process.env.PORT || 80), null);
