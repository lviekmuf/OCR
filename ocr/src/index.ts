import { RabbitService } from './services/rabbit.service';

import express from 'express';
import { config } from './config';
const rabbitService = new RabbitService()
const ocr = express();

ocr.listen(config.port, () => {
    console.log('OCR listening on port ', config.port);
    rabbitService.listenMessage()
})

export { ocr };

