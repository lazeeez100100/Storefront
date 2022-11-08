import user from "../types/user.type";
import db from '../database'
import bcrypt from "bcrypt";
import config from "../config";

const hashPassword= (password: string)=>{
    const salt = parseInt(config.salt as string, 10);
    return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};

class userModel{
    //create user
    async create(u: user): Promise<user>{
        try {
            const connection =await db.connect();
            const sql = `INSERT INTO users (email, user_name, first_name, last_name, password) 
            VALUES ($1, $2, $3, $4, $5) returning user_id, email, user_name, first_name, last_name`;    
            const result = await connection.query(sql,[
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                hashPassword(u.password)
            ]);
            connection.release();
            return result.rows[0];
        } catch (error) {
                throw new Error(
                `unable to create: ${u.user_name}, ${(error as Error).message}`
                );
            }

    }
    // get all users
    async Index(): Promise<user[]>{
        try {
            const connection =await db.connect();
            const sql = `SELECT user_id, email, user_name, first_name, last_name FROM users`;    
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
                throw new Error(
                `unable to retrieve users  ${(error as Error)}.message}`
                );
            }

    }
    // get specific userspace
    async Show(id: string): Promise<user>{
        try {
            const connection =await db.connect();
            const sql = `SELECT user_id, email, user_name, first_name, last_name FROM users where user_id=($1)`;    
            const result = await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
                throw new Error(
                `user not found ${id}, ${(error as Error)}.message}`
                );
            }

    }
    // update user

    async updateOne(u: user): Promise<user>{
        try {
            const connection =await db.connect();
            const sql = `UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5
                         WHERE user_id=$6 RETURNING user_id, email, user_name, first_name, last_name`;    
            const result = await connection.query(sql,[
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                hashPassword(u.password),
                u.user_id             
            ]);
            connection.release();
            return result.rows[0];
        } catch (error) {
                throw new Error(
                `couldn't update user: ${u.user_name}, ${(error as Error).message}`
                );
            }

    }
    // delete user
    async deleteOne(id: string): Promise<user>{
        try {
            const connection =await db.connect();
            const sql = `DELETE FROM users WHERE user_id=($1) RETURNING user_id, email, user_name, first_name, last_name`;    
            const result = await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
                throw new Error(
                `couldn't delete user: ${id}, ${(error as Error)}.message}`
                );
            }

    }
    //auth user
   async auth(email: string, password: string): Promise<user | null>{
    try {
        const connection =await db.connect();
        const sql = `SELECT password FROM users WHERE email=$1`;
        const result = await connection.query(sql,[email]);
        if(result.rows.length){
            const {password: hashPassword} = result.rows[0];
            const isPasswordValid = bcrypt.compareSync(
                `${password}${config.pepper}`,
                hashPassword
                );
                if(isPasswordValid){
                    const userInfo = await connection.query(
                        `SELECT user_id, email, user_name, first_name, last_name FROM users WHERE email=($1)`, 
                        [email]
                    );
                    return userInfo.rows[0];
                }
            }
            connection.release();
            return null;
        
    } catch (error) {
        throw new Error(`login failed: ${error as Error}.message`);
    }
   }
}

export default userModel;