import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

//route to save a new book
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

export default router;
