import { Injectable } from '@nestjs/common';
import firebase from 'firebase-admin';
// tslint:disable-next-line:no-var-requires
const configuration = require('./config.json');

@Injectable()
export class UsersService {
  public readonly app: firebase.app.App;
  constructor() {
    this.app = firebase.initializeApp({
      credential: firebase.credential.cert(configuration),
      databaseURL: 'https://xoxaapp.firebaseio.com',
    });
  }
}
