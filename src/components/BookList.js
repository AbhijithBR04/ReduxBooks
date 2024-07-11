import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook } from '../features/books/bookSlice';
import BookForm from './BookForm';
import './BookList.css'; 
const BookList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { books, status, error } = useSelector((state) => state.books);
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    dispatch(fetchBooks(user.name));
  }, [dispatch, user.name]);

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  const handleEditBook = (book) => {
    setEditBook(book);
  };

  const handleSaveBook = () => {
    setEditBook(null);
  };


  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="book-list">
        <h2>Book List</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td className="action-buttons">
                  <button className="edit-button" onClick={() => handleEditBook(book)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteBook(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="book-form">
        <h2>{editBook ? 'Edit Book' : 'Add Book'}</h2>
        <BookForm book={editBook} onSave={handleSaveBook} />
      </div>
    </div>
  );
};

export default BookList;
