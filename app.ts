import express, { Express, Request, Response } from 'express';
import { createServer } from 'http'
import { Socket } from 'socket.io';
import dotenv from 'dotenv';
import router from './routes/upload'

dotenv.config();
// const logger = require('./logs');
const { Server } = require('socket.io');

const app: Express = express();
const port = process.env.PORT;
// app.use(logger({ level: 'INFO' }));

const server = createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log('Welcome to server chat');

  socket.on('send', function (data) {
    io.sockets.emit('send', data);
  });
});

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

// set the view engine to ejs
app.set('views', 'app/views');
app.set('view engine', 'ejs');

app.use('/', router);
// use res.render to load up an ejs view file
app.get('/', (req: Request, res: Response) => {
  res.render('pages/index');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
