// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import bookReducer from '../features/books/bookSlice';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'books'], // Ensure both 'auth' and 'books' state are persisted
};


const rootReducer = combineReducers({
  auth: authReducer,
  books: bookReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});



export const persistor = persistStore(store);
