// src/redux/slices/authSlice.js


import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    user: Cookies.get('userEmail') ? {
      name: Cookies.get('userName'),
      email: Cookies.get('userEmail'),
      token: Cookies.get('authToken'),
    } : null,
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      loginSuccess: (state, action) => {
        state.user = action.payload;
      },
      registerSuccess: (state, action) => {
        state.user = action.payload;
      },
      forgetpassword: (state, action) => {
          state.user = action.payload;
          
      },
      logout: (state) => {
        state.user = null;
        Cookies.remove('authToken');
        Cookies.remove('userEmail');
        Cookies.remove('userName');
      },
    },
  });
  
  export const { loginSuccess, registerSuccess, logout } = authSlice.actions;
  export default authSlice.reducer;