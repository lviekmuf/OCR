import { AppRouter } from './services/approuter';
import bodyParser from 'body-parser';

import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(AppRouter);

app.listen(process.env.PORT, () => {
    console.log('Client is running...');
})

export { app };

