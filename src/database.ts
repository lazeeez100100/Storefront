import config from './config';
import { Pool } from 'pg';

let database_env;

//check environment variable and set as you need test or dev
config.env === 'dev' ? database_env = config.database :database_env = config.database_test;

const client = new Pool({
    host : config.host,
    port : config.port,
    database : database_env,
    user : config.user,
    password : config.password
});

export default client;