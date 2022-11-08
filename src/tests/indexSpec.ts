import supertest from 'supertest';
import app from '../index';

const request = supertest(app);


describe('start endpoint tests', ()=>{
    it('[get] / should return status 200',async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });

});