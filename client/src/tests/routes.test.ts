import request from 'supertest';
import { app } from '../index';

// jest.mock('./services');

describe('POST', () => {
    describe('Body consist url', () => {
        test('ok', async () => {
            const body = { fileUrl: "someUrl" }
            const response = await request(app).post('/push').send(body);
            expect(response.statusCode).toBe(200);
        })
    })

    describe("Body doesn't consist url", () => {
        test('Not found', async () => {
            const body = { }
            const response = await request(app).post('/push').send(body);
            expect(response.statusCode).toBe(400);
        })

    })

})




