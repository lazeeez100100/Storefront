import order from "../types/order.type";
import db from '../database'


class orderModel{
    
        //create model
        async create(o: order): Promise<order>{
            try {
                const connection =await db.connect();
                const sql = `INSERT INTO orders (user_id , status)  
                VALUES ((SELECT user_id from users WHERE user_id=$1), $2) returning *`;    
                const result = await connection.query(sql,[
                    o.user_id,
                    o.status
                ]);
                connection.release();
                return result.rows[0];
            } catch (error) {
                    throw new Error(
                    `unable to create order for user: ${o.user_id}, ${(error as Error).message}`
                    );
                }
    
        }
    // get all order by id
    async Index(id: string): Promise<order[]>{
        try {
            const connection =await db.connect();
            const sql = `SELECT * from orders where user_id=$1`;    
            const result = await connection.query(sql,[id]);
            connection.release();
            return (result.rows.length)? result.rows: ["no orders for this user"];
        } catch (error) {
                throw new Error(
                `unable to retrieve orders  ${(error as Error)}.message}`
                );
            }

    }

    // get activated order
    async Show(id: string, status: number): Promise<order[]>{
        if (status == 1){
            try {
                const connection =await db.connect();
                const sql = `SELECT * from orders WHERE user_id=($1) AND status=$2`;    
                const result = await connection.query(sql,[id,status]);
                connection.release();
                return (result.rows.length)? result.rows: ["not found any activated orders for this user"];
                
            } catch (error) {
                    throw new Error(
                    `user not found order ${id}, ${(error as Error)}.message}`
                    );
                }
        }
       else{
        throw new Error(
            `no completed orders for this user ${id}`
            );
       }
    }

    // delete all orders for one user
    async deleteAll(user_id: string): Promise <order[]>{
        try {
            const connection = await db.connect();
            const sql = `DELETE FROM orders WHERE user_id=($1)`;
            const result = await connection.query(sql,[user_id]);
            connection.release();
            return (result.rows.length)? result.rows: ["all user orders deleted successfully from table"];
        } catch (error) {
            throw new Error(
                `error in deleted `
            );
        }
    }
    
}

export default orderModel;