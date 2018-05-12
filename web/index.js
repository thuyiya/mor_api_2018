/* eslint-disable no-console */
import express from 'express';
import { router } from './routes';

const app = express();
const expressRoute = express.Router();

app.use('/', (req, res) => {
    res.send('successful')
});

export {
    app
};
