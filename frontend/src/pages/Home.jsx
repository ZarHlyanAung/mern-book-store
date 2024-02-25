import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiPlusSquare } from 'react-icons/fi';
import Spinner from '../components/Spinner';
import { BASE_URL } from '../config';
import BooksTable from '../components/BooksTable';
import BooksCard from '../components/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  console.log(import.meta.env.MODE, 'node env');

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/books`)
      .then((res) => {
        setBooks(res.data.data);
        console.log(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="p-4  h-[100vh] ">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold m-8">Book Store</h1>
        <span className="absolute top-1 left-1">{import.meta.env.MODE}</span>
        <Link to="/books/create">
          <FiPlusSquare className="text-3xl text-blue-500 m-8" />
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
