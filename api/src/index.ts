/* eslint-disable no-console */
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/api', router);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
  )
  .catch((error: { message: string }) => console.log(error.message));
