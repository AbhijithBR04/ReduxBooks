import { createSelector } from '@reduxjs/toolkit';

export const selectAllBooks = (state) => state.books.books || [];

export const selectBooksByGenre = (genre) =>
  createSelector([selectAllBooks], (books) =>
    books.filter((book) => book.genre === genre)
  );

export const selectBooksByAuthor = (author) =>
  createSelector([selectAllBooks], (books) =>
    books.filter((book) => book.author === author)
  );

export const selectBooksByStatus = (status) =>
  createSelector([selectAllBooks], (books) =>
    books.filter((book) => book.status === status)
  );

export const selectBooksSortedByTitle = createSelector([selectAllBooks], (books) =>
  books.slice().sort((a, b) => a.title.localeCompare(b.title))
);

export const selectBooksSortedByDate = createSelector([selectAllBooks], (books) =>
  books.slice().sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded))
);
