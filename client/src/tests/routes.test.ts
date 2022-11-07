import request from 'supertest';
import { app } from '../index';

jest.mock('./produce');

describe('POST', () => {
    describe('Body consist url', () => {
        test('ok', done => {
            request(app).post('/send').send(
                { "fileUrl": "someUrl" }
            ).end(err => {
                err ? expect(500) : expect(200)
                done();
            })
        })
    })

    describe("Body doesn't consist url", () => {
        test('Not found', async () => {
            const response = await request(producer).post('/send').send({});
            expect(response.statusCode).toBe(400);
        })
        test('responds to /send', () => {
            const req = {  };
    
            const res = { text: '',
                send: function(input) { this.text = input } 
            };
            app.post(req, res);
            
            expect(res.text).toEqual('hello world!');
        });
    
        test('responds to /send', () => {
            const req = { params: { fileUrl: 'test' }  };
    
            const res = { text: '',
                send: function(input) { this.text = input } 
            };
            hello(req, res);
            
            expect(res.text).toEqual('hello Bob!');
        });
    })

})




