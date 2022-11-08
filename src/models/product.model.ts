import product from "../types/product.type";
import db from '../database'

class productModel{
    //create product
    async create(p: product): Promise<product>{
        try {
            console.log(p.product_name);
            const connection =await db.connect();
            const sql = `INSERT INTO products (product_name, price) VALUES ($1, $2) returning product_id, product_name, price`;    
            const result = await connection.query(sql,[
                p.product_name,
                p.price
            ]);
            connection.release();
            return result.rows[0];
        } catch (error) {
                throw new Error(
                `unable to create: ${p.product_name}, ${(error as Error).message}`
                );
            }

    }
    // get all products
    async Index(): Promise<product[]>{
        try {
            const connection =await db.connect();
            const sql = `SELECT * FROM products`;    
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
                throw new Error(
                `unable to retrieve products  ${(error as Error)}.message}`
                );
            }

    }
    // get specific product
    async Show(id: string): Promise<product>{
        try {
            const connection =await db.connect();
            const sql = `SELECT * FROM products where product_id=($1)`;    
            const result = await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
                throw new Error(
                `product not found ${id}, ${(error as Error)}.message}`
                );
            }

    }
    
}

export default productModel;