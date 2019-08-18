import express from 'express';
import http from 'http';
import registerRoutes from './routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

const mongooseConnect = mongoose.connect('mongodb://admin:admin123@ds163867.mlab.com:63867/employee-management-inkredo', {useNewUrlParser: true});
mongoose.connection.on('error', (err) => {
    console.error(`Mongoose Connection Error: ${err}`);
    process.exit(-1);
})

const startServer = () => {
    server.listen('6555', () => {
        console.log('Express server listening on %d', '6555');
    });
}

registerRoutes(app);
setImmediate(startServer);

exports = module.exports = app;