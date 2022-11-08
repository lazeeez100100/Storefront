import orderProduct from "../types/orderProduct.type";
import db from '../database'


class orderProductModel{
    
        //add item to order
        async create(oP: orderProduct): Promise<orderProduct>{
            try {
                const connection =await db.connect();
                const sql = `INSERT INTO orderProduct (order_id, product_id, quantity) 
                VALUES ((SELECT order_id from orders WHERE order_id=$1),
                (SELECT product_id from products WHERE product_id=$2), $3) returning *`;    
                const result = await connection.query(sql,[
                    oP.order_id,
                    oP.product_id,
                    oP.quantity,
                ]);
                connection.release();
                return result.rows[0];
            } catch (error) {
                    throw new Error(
                    `unable to add product_id ${oP.product_id} to cart, ${(error as Error).message}`
                    );
                }
    
        }
            // get all order by order id
    async Index(id: string): Promise<orderProduct[]>{
        try {
            const connection =await db.connect();
            const sql = `SELECT * from orderProduct where order_id=$1`;    
            const result = await connection.query(sql,[id]);
            connection.release();
            return (result.rows.length)? result.rows: ["no orders for this user"];
        } catch (error) {
                throw new Error(
                `unable to retrieve orders  ${(error as Error)}.message}`
                );
            }

    }
}

export default orderProductModel;