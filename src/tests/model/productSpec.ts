import UserModel from '../../models/user.model';
import ProductModel from '../../models/product.model';
import db from '../../database';
import User from '../../types/user.type';
import product from '../../types/product.type';

const userModel = new UserModel();
const productModel = new ProductModel();

    describe('User products',()=>{
        describe('Test method exist',() =>{

            it('should have all products model methods', ()=>{
                expect(productModel.Index).toBeDefined();
                expect(productModel.Show).toBeDefined();
                expect(productModel.create).toBeDefined();
            });
        });

    describe('Test user model logic',() =>{

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
        it('Test create method',async() =>{
            const createProduct=await productModel.create ({
                product_name:'testProduct2', 
                price:50
            } as product);
            expect(createProduct.product_name).toBe('testProduct2');
        });

        it('index method should return all available products in db', async ()=>{
            const products = await productModel.Index();
            expect(products.length).toBe(2);
        });
        it('show method should return one product when called with id', async ()=>{
            const returnedProduct = await productModel.Show(product.product_id as unknown as string);
            expect(returnedProduct.product_id).toBe(product.product_id);
            expect(returnedProduct.product_name).toBe(product.product_name);
        });
    });

});