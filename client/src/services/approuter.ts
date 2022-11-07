import { Router } from 'express';
import { RabbitService } from './rabbit.service';
const rabbitService = new RabbitService()
const AppRouter = Router();

AppRouter.post('/push', (req, res) => {
    if (req.body.fileUrl) {
        try {
            rabbitService.sendMessage(req.body);
            res.send("Message is sended");
        }
        catch {
            res.status(500)
            res.send("Something went wrong");
        }
    }
    else {
        res.status(400)
        res.send("No file url sended");
    }
})

export { AppRouter };

