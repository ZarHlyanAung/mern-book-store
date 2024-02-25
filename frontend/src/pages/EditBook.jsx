import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleEditSave = () => {
    setIsLoading(true);
    const book = {
      title,
      author,
      publishYear,
    };
    axios
      .put(`${BASE_URL}/books/${id}`, book)
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });

        navigate('/');
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert('Error');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 font-bold">Edit Book</h1>
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
          onClick={handleEditSave}
          className="bg-sky-400 px-4 py-2 rounded-md border-4 border-black w-full"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
