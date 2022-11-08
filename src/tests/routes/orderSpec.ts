import ProductModel from '../../models/product.model';
import UserModel from '../../models/user.model';
import OrderModel from '../../models/order.model';
import db from '../../database';
import product from '../../types/product.type';
import User from '../../types/user.type';
import Order from '../../types/order.type';
import supertest from 'supertest';
import app from '../../index';

const productModel = new ProductModel();
const userModel = new UserModel();
const orderModel = new OrderModel();
const request = supertest(app);
let token = '';

describe('order api endpoint',() =>{
        const user= {
            email: 'test@test.com',
            user_name:'testUser', 
            first_name:'Test',
            last_name: 'User',
            password: 'tester'
        } as User;

        const order= {
            status : 1,
        } as Order;

        const product= {
            product_name:'testProduct', 
            price:15,
        } as product;
        beforeAll(async() =>{
            const createUser = await userModel.create(user);
            user.user_id = createUser.user_id;
            const createProduct= await productModel.create(product);
            product.product_id = createProduct.product_id;
            order.user_id=  user.user_id;           
            const createOrder= await orderModel.create(order);
            order.order_id = createOrder.order_id;
        });
        afterAll(async ()=>{
            const connection = await db.connect();
            const sql = 'DELETE FROM users;';
            await connection.query(sql);
            const sql2 = 'DELETE FROM products;';
            await connection.query(sql2);
            const sql3 = 'DELETE FROM products;';
            await connection.query(sql3);
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
            it('should make an order',async () => {
                const res = await request
                .post(`/api/orders/`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    user_id:user.user_id,
                    status:0, 
                } as Order);
                expect(res.status).toBe(200);
                const {status} = res.body;
                expect(status).toBe(0);
            });
            it('should get list of orders',async () => {
                const res = await request
                .get(`/api/orders/${order.user_id}`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                expect(res.status).toBe(200);
                expect(res.body.length).toBe(2);
            });
            it('should get activated order only',async () => {
                const res = await request
                .get(`/api/orders/${order.user_id}/1`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                expect(res.status).toBe(200);
                expect(res.body.length).toBe(1);
            });
        });
});