import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import helmet from 'helmet';
import { Sequelize } from 'sequelize';
import { routes } from './routes';
import db from '@/data/models';

const PORT = Number(process.env.PORT) || 5000;

// create and setup express app and its middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// TODO routes first approach pass down the client
app.use('/', routes());

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

process.on('unhandledRejection', function (reason, p) {
  console.log(
    'Possibly Unhandled Rejection at: Promise ',
    p,
    ' reason: ',
    reason
  );
});

process.on('uncaughtException', function (err) {
  console.log(err);
});
