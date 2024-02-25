import { Link } from 'react-router-dom';
import { FiInfo, FiEdit2, FiDelete } from 'react-icons/fi';

const BooksTable = ({ books }) => {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 max-w-10 rounded-md">Title</th>
          <th className="border border-slate-600 max-w-10 rounded-md max-md:hidden">
            Author
          </th>
          <th className="border border-slate-600 max-w-10 rounded-md max-md:hidden">
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
            <td className="border border-slate-700 text-ellipsis whitespace-nowrap px-2 overflow-hidden max-w-20 rounded-md text-center">
              {book.title}
            </td>
            <td className="border border-slate-700 text-ellipsis whitespace-nowrap px-2 overflow-hidden max-w-20 rounded-md text-center max-md:hidden">
              {book.author}
            </td>
            <td className="border border-slate-700 text-ellipsis whitespace-nowrap px-2 overflow-hidden max-w-20 rounded-md text-center max-md:hidden">
              {book.publishYear}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/books/details/${book._id}`}>
                  <FiInfo className="text-2xl text-green-800" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <FiEdit2 className="text-2xl text-yellow-600" />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <FiDelete className="text-2xl text-red-600" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
