import UserModel from '../../models/user.model';
import db from '../../database';

const userModel = new UserModel();
describe('Auth Module',()=>{
    describe('Test if exists', () =>{
        it('should have an auth User method',() =>{
            expect(userModel.auth).toBeDefined();
        })
    })
    describe('Test auth logic',() =>{

        beforeAll(async() =>{
             await userModel.create({
                email: 'awni@test.com',
                user_name:'ahmedAwni', 
                first_name:'ahmed',
                last_name: 'awni',
                password: 'awniPass'
            });
        });
        afterAll(async ()=>{
            const dbConnection = await db.connect();
            const sql = 'DELETE FROM users;';
            await dbConnection.query(sql);
            dbConnection.release();
        });
        
        it('auth method should return the auth user info', async ()=>{
            const authUser = await userModel.auth(
                'awni@test.com',
                'awniPass'
            );
            expect(authUser?.email).toBe('awni@test.com');
            expect(authUser?.user_name).toBe('ahmedAwni');
            expect(authUser?.first_name).toBe('ahmed');
            expect(authUser?.last_name).toBe('awni');
        });
        it('Auth method should return null for wrong credentials', async ()=>{
            const authUser = await userModel.auth(
                'ahmed@awni.com',
                'fake-password'
            );
            expect(authUser).toBe(null);
        });
        
    });
});