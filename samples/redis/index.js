const redis = require('ioredis');

const client = redis('localhost');
console.log(client);
client.set('KEY', 'VALUE').then(() => console.log('DONE')).catch(() => console.log("ERROR"));