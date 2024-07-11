import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../features/books/bookSlice';
import { logout } from '../features/auth/authSlice';
import { selectAllBooks } from '../features/books/bookSelectors';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks); 

  const [filters, setFilters] = useState({
    title: '',
    author: '',
    status: '',
  });

  const [sortOption, setSortOption] = useState('');

  let filteredBooks = [...books]; 

  if (filters.title) {
    filteredBooks = filteredBooks.filter((book) =>
      book.title.toLowerCase().includes(filters.title.toLowerCase())
    ); 
  }

  if (filters.author) {
    filteredBooks = filteredBooks.filter((book) =>
      book.author.toLowerCase().includes(filters.author.toLowerCase())
    ); 
  }

  // if (sortOption === 'title') {
  //   filteredBooks.sort((a, b) => a.title.localeCompare(b.title)); 
  // } else if (sortOption === 'date') {
  //   filteredBooks.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)); 
  // }

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    console.log('Fetching books...');
    dispatch(fetchBooks());
  }, [dispatch]);

  const getStatusColor = (status) => {
    if (status === 'reading') {
      return '#4CAF50'; // Green color for 'reading'
    } else if (status === 'read') {
      return '#FF6347'; // Red color for 'read'
    }
    return '';
  };

  return (
    <div className="home-container">
      <h1 className="home-heading">Welcome to Your Library</h1>
      <div className="filters-container">
        <label>
          Title: 
          <input type="text" name="title" value={filters.title} onChange={handleInputChange} />
        </label>
        <label>
          Author:
          <input type="text" name="author" value={filters.author} onChange={handleInputChange} />
        </label>

        <label>
          Sort By:
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="">None</option>
            <option value="title">Title</option>
            <option value="date">Date Added</option>
          </select>
        </label>
      </div>
      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td style={{ color: getStatusColor(book.status.toLowerCase()) }}>{book.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
