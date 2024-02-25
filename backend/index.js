import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5555;

const app = express();

app.use(express.json());

// middleware for handing cors policy
// app.use(
//   cors({
//     origin: [
//       'http://localhost:5173',
//       'http://localhost:5174',
//       'https://mern-book-store-zha.vercel.app/',
//     ],
//     methods: ['GET', 'POST', 'DELETE', 'PUT'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

//cors wildcard
app.use(
  cors({
    origin: '*',
  })
);

app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Welcome to MERN book store');
});

app.use('/books', booksRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected...');
    app.listen(PORT, () => {
      console.log(`App is listening to: ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
