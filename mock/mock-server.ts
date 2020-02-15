import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import route from './router';

const app = express();
const port = 9528;

app.use(compression());
app.use(morgan('dev')); // logger
app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '-1');
    next();
}); // no cache
app.use(route);

// Event listener for HTTP server "error" event.
function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error('Express ERROR (app) : %s requires elevated privileges', bind);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error('Express ERROR (app) : %s is already in use', bind);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
console.log('Mock server started on port ' + port + '!');
