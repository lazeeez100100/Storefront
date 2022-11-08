import ProductModel from '../../models/product.model';
import UserModel from '../../models/user.model';
import db from '../../database';
import product from '../../types/product.type';
import User from '../../types/user.type';
import supertest from 'supertest';
import app from '../../index';

const productModel = new ProductModel();
const userModel = new UserModel();
const request = supertest(app);
let token = '';

describe('product api endpoint',() =>{
    const user= {
        email: 'test@test.com',
        user_name:'testUser', 
        first_name:'Test',
        last_name: 'User',
        password: 'tester'
    } as User;
        const product= {
            product_name:'testProduct', 
            price:15,
        } as product;
        beforeAll(async() =>{
            const createUser = await userModel.create(user);
            user.user_id = createUser.user_id;
            const createProduct= await productModel.create(product);
            product.product_id = createProduct.product_id;
        });
        afterAll(async ()=>{
            const connection = await db.connect();
            const sql2 = 'DELETE FROM users;';
            await connection.query(sql2);
            const sql = 'DELETE FROM products;';
            await connection.query(sql);
            connection.release();
        });

        describe('test auth method', ()=>{
            it('should be able to auth to get token',async () => {
                const res = await request
                .post('/api/users/auth')
                .set('content-type', 'application/json')
                .send({
                    email: 'test@test.com',
                    password: 'tester'
                });
                expect(res.status).toBe(200);
                const {user_id, email, token:userToken} = res.body.data;
                expect(user_id).toBe(user.user_id);
                expect(email).toBe('test@test.com');
                token = userToken;
            });
            it('should be failed to auth to get token',async () => {
                const res = await request
                .post('/api/users/auth')
                .set('content-type', 'application/json')
                .send({
                    email: 'no@test.com',
                    password: 'tester'
                });
                expect(res.status).toBe(401);
            });
        });

        describe('test routes endpoint methods', ()=>{
            it('should create new product',async () => {
                const res = await request
                .post('/api/products/')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    product_name:'testProduct2', 
                    price:50,
                } as product);
                expect(res.status).toBe(200);
                const {product_name, price} = res.body;
                expect(product_name).toBe('testProduct2');
                expect(price).toBe('50.000000');
            });
            it('should get list of Products',async () => {
                const res = await request
                .get('/api/products/')
                .set('content-type', 'application/json')
                expect(res.status).toBe(200);
                expect(res.body.length).toBe(2);
            });
            it('should get info of one Product',async () => {
                const res = await request
                .get(`/api/products/${product.product_id}`)
                .set('content-type', 'application/json')
                expect(res.status).toBe(200);
                expect(res.body.product_name).toBe('testProduct');
                expect(res.body.price).toBe('15.000000');
            });


        });
});