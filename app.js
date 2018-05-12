import http from 'http';
import { app } from './web';

const PORT = process.env.PORT || 3000

http.createServer(app).listen(PORT, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`App listen to port: ${PORT}`);
    }
});