import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { connectDB } from './db/database.js';
import { config } from './config.js';

const app = express();

const corsOption = {
  origin: config.cors.allowOrign,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOption));
app.use(helmet());
app.use(morgan('tiny'));

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});

connectDB()
  .then(() => {
    console.log('mongoDB connected!');

    app.listen(config.host.port, () => {
      console.log(`app listening at ${config.host.port}`);
    });
  })
  .catch(console.error);
