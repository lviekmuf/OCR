const amqp = require('amqplib');
import { RabbitService } from '../services/rabbit.service';
import { config } from '../config';
const imageUrl = "https://onlinetexttools.com/images/examples-onlinetexttools/text-custom-font.png";
const { url, queue } = config


describe('Consuming with Rabbit MQ', async () => {
    test('should pass', async () => {
        const rabbitService = new RabbitService()
        const data = {
            fileUrl: imageUrl
        }

        const channel = {
            assertQueue: jest.fn(),
            consume: jest.fn().mockImplementation((callback) => {
                callback(data);
            }),
            ack: jest.fn()
        };

        const connection = {
            createChannel: jest.fn().mockResolvedValueOnce(channel)
        };

        jest.spyOn(amqp, 'connect').mockResolvedValueOnce(connection);

        await rabbitService.listenMessage();
        expect(amqp.connect).toBeCalledWith(url);
        expect(connection.createChannel).toBeCalled();
        expect(channel.assertQueue).toBeCalledWith(queue);
        // expect(channel.consume).toBeCalledWith(queue, expect.any(Function));
    });
});