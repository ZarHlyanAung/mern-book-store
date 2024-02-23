import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiPlusSquare } from 'react-icons/fi';
import Spinner from '../components/Spinner';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="p-4 bg-teal-500 h-full">
      <div className="flex justify-center items-center ">
        <h1 className="text-3xl font-bold m-8">Book Store</h1>
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
          <tbody></tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
