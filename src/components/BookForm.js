import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addBook, updateBook } from '../features/books/bookSlice';
import './BookForm.css'; 

const BookForm = ({ book, onSave }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState('unread');
  const dispatch = useDispatch();

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setGenre(book.genre);
      setStatus(book.status);
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { id: book ? book.id : Date.now(), title, author, genre, status };
    if (book) {
      dispatch(updateBook(newBook)); // Dispatch updateBook action from bookSlice
    } else {
      dispatch(addBook(newBook)); // Dispatch addBook action from bookSlice
    }
    if (onSave) {
      onSave();
    }
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setAuthor('');
    setGenre('');
    setStatus('unread');
  };

  return (
    <form class="book" onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Genre</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="unread">Unread</option>
          <option value="reading">Reading</option>
          <option value="read">Read</option>
        </select>
      </div>
      <button type="submit">{book ? 'Update' : 'Add'} Book</button>
    </form>
  );
};

export default BookForm;
