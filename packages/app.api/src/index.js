"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.get('/', function (_, res) { return res.send('Hello world'); });
app.listen(8080, function () { return console.log('Listening on port 8080'); });
