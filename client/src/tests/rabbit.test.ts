import { config } from '../config';
import { RabbitService } from '../services/rabbit.service';
const amqp = require('amqplib');

const { queue, url } = config


describe('Sending message to Rabbit MQ', () => {
    test('should pass', async () => {
        const rabbitService = new RabbitService()
        const data = {
            fileUrl: "http://example.com",
        };
        const channel = {
            assertQueue: jest.fn(),
            sendToQueue: jest.fn(),
            consume: jest.fn().mockImplementation((queue, callback) => {
                callback(data);
            }),
        };
        const connection = {
            createChannel: jest.fn().mockImplementation((callback) => {
                callback(null, channel);
            }),
        };

        jest.spyOn(amqp, 'connect').mockResolvedValueOnce(connection);

        await rabbitService.sendMessage(data)
        // expect(amqp.connect).toBeCalledWith(url);
        // expect(connection.createChannel).toBeCalled();
        // expect(channel.assertQueue).toBeCalledWith(queue);
        expect(channel.sendToQueue).toBeCalledWith(queue, Buffer.from(JSON.stringify(data)));
    });
});