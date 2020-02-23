const bluebird = require('bluebird');
const redis = require('redis');

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = require('./config');

// Promisify all redis functions.
bluebird.promisifyAll(redis);
let client = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
    enable_offline_queue: false
});
// Handle successful connection.
client.on('connect', () => {
    console.log('Redis connected.');
});
// Handle error.
client.on('error', (err) => {
    console.log('Unable to connect Redis.', err);
});
module.exports = client