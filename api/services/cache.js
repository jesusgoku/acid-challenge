import redis from 'redis';
import { promisify } from 'util';

import config from '../config/config';


const REDIS_URL = config.API.REDIS_URL;
const client = redis.createClient(REDIS_URL);


export const getAsync = promisify(client.get).bind(client);
export const setexAsync = promisify(client.setex).bind(client);

export default client;
