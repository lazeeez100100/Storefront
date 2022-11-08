import UserModel from '../../models/user.model';
import OrderModel from '../../models/order.model';
import db from '../../database';
import User from '../../types/user.type';
import product from '../../types/product.type';
import Order from '../../types/order.type';

const userModel = new UserModel();
const orderModel = new OrderModel();

    describe('User products',()=>{
        describe('Test method exist',() =>{

            it('should have all orders method', ()=>{
                expect(orderModel.Show).toBeDefined();
                expect(orderModel.Index).toBeDefined();
                expect(orderModel.create).toBeDefined();
            });
        });

    describe('Test user model logic',() =>{

        const order= {
            status : 1,
        } as Order;

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

        it('Test create method',async() =>{
            const createOrder=await orderModel.create ({
                user_id:user.user_id,
                status:0, 
                quantity:0
            } as Order);
            expect(createOrder.user_id).toBe(user.user_id);
            expect(createOrder.status).toBe(0);
        });

        it('index method should return all available products in db', async ()=>{
            const orders = await orderModel.Index(user.user_id as unknown as string);
            expect(orders.length).toBe(2);
        });
        it('show method should return one product when called with id', async ()=>{
            const orders = await orderModel.Show(user.user_id as unknown as string,1);
            expect(orders.length).toBe(1);
        });
    });

});