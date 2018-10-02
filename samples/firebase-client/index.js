const firebase = require('firebase');

var config = {
  apiKey: "AIzaSyC1ZSD-0VLgg_jXOjkm_pJtAVF644JwBLk",
  authDomain: "xoxaapp.firebaseapp.com",
  databaseURL: "https://xoxaapp.firebaseio.com",
  projectId: "xoxaapp",
  storageBucket: "xoxaapp.appspot.com",
  messagingSenderId: "760814537863"
};
const app = firebase.initializeApp(config);

const email = 'user@example.com';
const password = 'secretPassword';

app.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
.then(res => {
  console.log(res);
  res.user.getIdToken(true).then(token => {
    console.log(token);
  });
})
.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log('ERROR', error);
  // ...
});