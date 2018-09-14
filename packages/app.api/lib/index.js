"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const message = require("app.domain/lib");
const app = express();
app.get('/', (_, res) => res.send(message));
app.listen(3001, () => console.log('Listening on port 3001'));
//# sourceMappingURL=index.js.map