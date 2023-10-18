import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes/upload'

dotenv.config();
// const logger = require('./logs');
// const { Server } = require('socket.io');

const app: Express = express();
const port = process.env.PORT;
// app.use(logger({ level: 'INFO' }));

// dotenv.config();

// const server = http.createServer(app);

// const io = new Server(server);

// io.on("connection", (socket: Socket) => {
//   console.log("connected");
// });

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
