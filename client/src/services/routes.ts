import {Router} from 'express';
import { RabbitService } from './produce';
const rabbitService = new RabbitService()
const AppRouter = Router();

AppRouter.post('/send', (req, res) => {
    if (req.body.fileUrl) {
        try {
            rabbitService.sendMessage(req.body);
            res.send("Message is sended");
        }
        catch {
            res.sendStatus(500);
        }
    }
    else{
        res.sendStatus(400);
    }
})

export { AppRouter };

