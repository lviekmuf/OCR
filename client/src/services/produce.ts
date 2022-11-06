import { config } from '../config';
import amqp, { Channel } from 'amqplib';
const { url, queue } = config;

class RabbitService {
    channel: Channel | undefined;
    queue: string;
    url: string;
    constructor() {
        this.queue = queue
        this.url = url
    }
    async initChanel() {
        const connection = await amqp.connect('amqp://user:user@rabbitmq:5672');
        this.channel = await connection.createChannel();
        await this.channel.assertQueue(this.queue);
    }
    async sendMessage(message: { fileUrl: string }): Promise < void> {
        try {
            await this.initChanel()
            await this.channel?.sendToQueue(this.queue, Buffer.from(JSON.stringify(message)));
            console.log('Sending message...');
        }
        catch(err) {
            console.log(err);
        }
    }
}

export { RabbitService };
