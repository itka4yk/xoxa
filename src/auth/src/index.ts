import * as express from 'express';
const app = express.default();
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from './jwt';
import errorHandler from './errorHandler';
import usersController from './UsersController';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', usersController);

// global error handler
app.use(errorHandler);

// start server
const port = 8080;

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
