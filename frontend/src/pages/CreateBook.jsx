import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useSnackbar } from 'notistack';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSave = () => {
    setIsLoading(true);
    const book = {
      title,
      author,
      publishYear,
    };
    axios
      .post(`${BASE_URL}/books`, book)
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });

        navigate('/');
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert('Error');
        setIsLoading(false);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 font-bold">Create Book</h1>
      {isLoading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-sky-400 px-4 py-2 rounded-md border-4 border-black w-full"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
