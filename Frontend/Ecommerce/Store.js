// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Ecommerce/redux/AuthSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
