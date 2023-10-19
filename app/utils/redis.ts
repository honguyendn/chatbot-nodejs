import { createClient } from 'redis';
require('dotenv').config();

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

(async () => { return await client.connect(); })();

export default client
