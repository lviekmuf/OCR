import amqp, { Channel } from 'amqplib';
import { config } from '../config';
import { ImageService } from './image.service';
import { OCR } from './ocr.service';
const FILE_NAME = 'image.jpg'
const { url, queue } = config

class RabbitService {
    channel: Channel | undefined;
    imageService: ImageService;
    ocrService: OCR
    queue: string
    url: string
    constructor() {
        this.queue = queue
        this.url = url
        this.imageService = new ImageService()
        this.ocrService = new OCR()
    }
    async initChannel() {
        const connection = await amqp.connect(this.url);
        this.channel = await connection.createChannel();
        await this.channel.assertQueue(this.queue);
    }

    async listenMessage() {
        try {
            await this.initChannel()
            this.channel?.consume(this.queue, async (msg) => {
                if (msg !== null) {
                    const { fileUrl } = JSON.parse(msg.content.toString());
                    console.log('File URL:', fileUrl);
                    console.log('Processing...');
                    await this.imageService.saveFile(fileUrl, FILE_NAME)
                    const recognizedText = await this.ocrService.recognizeText(FILE_NAME)
                    console.log('Recognized Text:\n', recognizedText);
                    this.channel?.ack(msg);
                } else {
                    console.log('Something went wrong');
                }
            })
        }
        catch (error) {
            setTimeout(() => this.listenMessage(), 1000)
        }
    }
}
export { RabbitService };
