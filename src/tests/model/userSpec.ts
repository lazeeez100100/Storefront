import UserModel from '../../models/user.model';
import db from '../../database';
import User from '../../types/user.type';

const userModel = new UserModel();

describe('User Model',()=>{
    describe('Test method exist',() =>{

        it('should have all crud and auth users model methods', ()=>{
            expect(userModel.Index).toBeDefined();
            expect(userModel.Show).toBeDefined();
            expect(userModel.create).toBeDefined();
            expect(userModel.updateOne).toBeDefined();
            expect(userModel.deleteOne).toBeDefined();
            expect(userModel.auth).toBeDefined();
        });
    });

    describe('Test user model',() =>{
        const user= {
            email: 'awni@test.com',
            user_name:'ahmedAwni', 
            first_name:'ahmed',
            last_name: 'awni',
            password: 'tester'
        } as User;
        beforeAll(async() =>{
            const userConnection = await userModel.create(user);
            user.user_id = userConnection.user_id;
        });
        afterAll(async ()=>{
            const dbConnection = await db.connect();
            const sql = 'DELETE FROM users;';
            await dbConnection.query(sql);
            dbConnection.release();
        });
        it('Test create function',async() =>{
            const userConnection=await userModel.create ({
                email: 'awni2@my.com',
                user_name:'noon', 
                first_name:'awni',
                last_name: 'mostafa',
                password: 'asdf1234'
            } as User);
            expect(userConnection).toEqual({
                 user_id: userConnection.user_id,
                 email: 'awni2@my.com', 
                 user_name:'noon', 
                 first_name:'awni', 
                 last_name:'mostafa'
            }as User);
        });

        it('index function should get all users in db', async ()=>{
            const users = await userModel.Index();
            expect(users.length).toBe(2);
        });
        it('show function should return testUser when called with id', async ()=>{
            const returnedUser = await userModel.Show(user.user_id as unknown as string);
            expect(returnedUser.user_id).toBe(user.user_id);
            expect(returnedUser.email).toBe(user.email);
            expect(returnedUser.user_name).toBe(user.user_name);
            expect(returnedUser.first_name).toBe(user.first_name);
            expect(returnedUser.last_name).toBe(user.last_name);
        });

        it('updateOne function should return edited user', async ()=>{
            const updatedUser = await userModel.updateOne({
                ...user, 
                user_name: 'testUser Updated',
                first_name: 'ahmed',
                last_name: 'awni'
            });
            expect(updatedUser.user_id).toBe(user.user_id);
            expect(updatedUser.email).toBe(user.email);
            expect(updatedUser.user_name).toBe('testUser Updated');
            expect(updatedUser.first_name).toBe('ahmed');
            expect(updatedUser.last_name).toBe('awni');
        });

        
        it('deleteOne one function should delete user', async ()=>{
            const deletedUser = await userModel.deleteOne(user.user_id as unknown as string);
            expect(deletedUser.user_id).toBe(user.user_id);
        });
    });

});