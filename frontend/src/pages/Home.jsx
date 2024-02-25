import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiPlusSquare, FiInfo, FiEdit2, FiDelete } from 'react-icons/fi';
import Spinner from '../components/Spinner';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(import.meta.env.MODE, 'node env');

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:5555/books')
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
    <div className="p-4  h-full">
      <div className="flex justify-between items-cente">
        <h1 className="text-3xl font-bold m-8">Book Store</h1>
        <span className="absolute top-1 left-1">{import.meta.env.MODE}</span>
        <Link to="/books/create">
          <FiPlusSquare className="text-3xl text-blue-500 m-8" />
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Author
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Publish Year
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {book.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.author}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.publishYear}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-8 max-md:gap-x-4">
                    <Link to={`/books/details/${book._id}`}>
                      <FiInfo className="text-2xl text-green-500" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <FiEdit2 className="text-2xl text-blue-500" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <FiDelete className="text-2xl text-red-500" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
