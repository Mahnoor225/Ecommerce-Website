import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  user: Cookies.get('userEmail')
    ? {
        name: Cookies.get('userName'),
        email: Cookies.get('userEmail'),
        token: Cookies.get('authToken'),
        userId: Cookies.get('userid'),
        avatar: Cookies.get('userAvatar'),
      }
    : null,
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
    setEmail: (state, action) => {
      if (!state.user) state.user = {};
      state.user.email = action.payload;
    },
    forgetpassword: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      Cookies.remove('authToken');
      Cookies.remove('userEmail');
      Cookies.remove('userName');
      Cookies.remove('userAvatar');
      Cookies.remove('userid');
    },
  },
});

export const {
  loginSuccess,
  registerSuccess,
  forgetpassword,
  setEmail,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
