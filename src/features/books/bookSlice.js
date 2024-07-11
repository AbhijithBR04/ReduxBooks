import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  books: [],
  status: 'idle',
  error: null,
};

// Async thunk for fetching books
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return JSON.parse(localStorage.getItem('books')) || [];
});

// Book slice
const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
      addBook: (state, action) => {
        state.books.push(action.payload);
        localStorage.setItem('books', JSON.stringify(state.books)); 
      },
      updateBook: (state, action) => {
        const index = state.books.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
          localStorage.setItem('books', JSON.stringify(state.books)); 
        }
      },
      deleteBook: (state, action) => {
        state.books = state.books.filter(book => book.id !== action.payload);
        localStorage.setItem('books', JSON.stringify(state.books));
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBooks.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchBooks.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.books = action.payload;
        })
        .addCase(fetchBooks.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });

export const { addBook, updateBook, deleteBook } = bookSlice.actions;
export default bookSlice.reducer;
