import UserConnection from '../../models/user.model';
import db from '../../database';
import User from '../../types/user.type';
import supertest from 'supertest';
import app from '../../index';

const userConnection = new UserConnection();
const request = supertest(app);
let token = '';

describe('user api endpoint',() =>{
        const user= {
            email: 'mytest@test.com',
            user_name:'myTest', 
            first_name:'T1',
            last_name: 'tParent',
            password: 'toot'
        } as User;
        beforeAll(async() =>{
            const userData = await userConnection.create(user);
            user.user_id = userData.user_id;
        });
        afterAll(async ()=>{
            const dbConnection = await db.connect();
            const sql = 'DELETE FROM users;';
            await dbConnection.query(sql);
            dbConnection.release();
        });
        describe('test auth method', ()=>{
            it('should be able to auth to get token',async () => {
                const res = await request
                .post('/api/users/auth')
                .set('content-type', 'application/json')
                .send({
                    email: 'mytest@test.com',
                    password: 'toot'
                });
                expect(res.status).toBe(200);
                const {user_id, email, token:userToken} = res.body.data;
                expect(user_id).toBe(user.user_id);
                expect(email).toBe('mytest@test.com');
                token = userToken;
            });
            it('should be failed to auth to get token',async () => {
                const res = await request
                .post('/api/users/auth')
                .set('content-type', 'application/json')
                .send({
                    email: 'notlog@yahoo.com',
                    password: 'tester'
                });
                expect(res.status).toBe(401);
            });
        });
        describe('test api methods', ()=>{
            it('should create new user',async () => {
                const res = await request
                .post('/api/users/')
                .set('content-type', 'application/json')
                .send({
                    email: 'mytest2@mytest2.com',
                    user_name: 'myTestUser2',
                    first_name: 'my2',
                    last_name: 'Parent2',
                    password: 'ok1234'
                } as User);
                expect(res.status).toBe(200);
                const {email, user_name, first_name, last_name} = res.body;
                expect(email).toBe('mytest2@mytest2.com');
                expect(user_name).toBe('myTestUser2');
                expect(first_name).toBe('my2');
                expect(last_name).toBe('Parent2');
            });
            it('should get list of user',async () => {
                const res = await request
                .get('/api/users/')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                expect(res.status).toBe(200);
                expect(res.body.length).toBe(2);
            });
            it('should get user info',async () => {
                const res = await request
                .get(`/api/users/${user.user_id}`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                expect(res.status).toBe(200);
                expect(res.body.user_name).toBe('myTest');
                expect(res.body.email).toBe('mytest@test.com');
            });

            it('should update user',async () => {
                const res = await request
                .patch(`/api/users/${user.user_id}`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    ...user,
                    user_name: 'ahmedAwni',
                    first_name: 'ahmed',
                    last_name: 'awni',
                });
                expect(res.status).toBe(200);
                const {user_name, first_name, last_name} = res.body;
                expect(user_name).toBe('ahmedAwni');
                expect(first_name).toBe('ahmed');
                expect(last_name).toBe('awni');
            });
            it('should delete user',async () => {
                const res = await request
                .delete(`/api/users/${user.user_id}`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                expect(res.status).toBe(200);
                expect(res.body.user_id).toBe(user.user_id);
                expect(res.body.user_name).toBe('ahmedAwni');
            });

        });
});