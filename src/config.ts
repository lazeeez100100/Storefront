import dotenv from 'dotenv';

dotenv.config();

const {
    POSTGRES_USER ,
    POSTGRES_PASSWORD, 
    SERVER_PORT,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    TOKEN_SECRET,
    ENV,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_DB_TEST
} = process.env;

export default { 
    password : POSTGRES_PASSWORD,
    server_port : SERVER_PORT,
    pepper: BCRYPT_PASSWORD,
    salt: SALT_ROUNDS,
    tokenSecret: TOKEN_SECRET,
    env: ENV,
    host : POSTGRES_HOST,
    port : parseInt(POSTGRES_PORT as string , 10),
    database : POSTGRES_DB,
    database_test:POSTGRES_DB_TEST,
    user : POSTGRES_USER
};
