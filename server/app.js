import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { connectDB } from './model/database.js';
import { config } from './config.js';
import articleRouter from './router/article.js';
import authRouter from './router/auth.js';
import commentRouter from './router/comment.js';

const app = express();

const corsOption = {
  origin: config.cors.allowOrign,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/article', articleRouter);
app.use('/auth', authRouter);
app.use('/comment', commentRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});

// DB 연결 후 서버 시작
connectDB()
  .then(() => {
    console.log('mongoDB connected!');

    app.listen(config.host.port, () => {
      console.log(`app listening at ${config.host.port}`);
    });
  })
  .catch(console.error);
