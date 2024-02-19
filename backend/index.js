import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';

dotenv.config();

const PORT = process.env.PORT || 5555;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Welcome to MERN book store');
});

//route to save a new book
app.post('/books', async (req, res) => {
  try {
    // res.status(105).send('received req');
    if (req.body.title && req.body.author && req.body.publishYear) {
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };

      const book = await Book.create(newBook);
      return res.status(201).send({
        message: 'Book added successfully',
        book,
      });
    } else {
      return res.status(400).send('Please provide all fields');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//route to get all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error getting books',
      error,
    });
  }
});

//route to get a book by id
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      return res.status(200).json(book);
    } else {
      return res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error getting the book',
      error,
    });
  }
});

//route to update the book by id
app.put('/books/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).json({
        message: 'Please provide all fields',
        yourbody: req.body,
      });
    }

    const result = await Book.findByIdAndUpdate(req.params.id, req.body);

    if (!result) return res.status(404).send('Book not found');

    return res.status(200).json({
      message: 'Book updated successfully',
      book: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error updating the book',
      error,
    });
  }
});

//route to delete book by id
app.delete('/books/:id', async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send('Book not found');
    return res.status(200).json({
      message: 'Book deleted successfully',
      book: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error deleting the book',
      error,
    });
  }
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected...');
    app.listen(PORT, () => {
      console.log(`App is listening to: ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
