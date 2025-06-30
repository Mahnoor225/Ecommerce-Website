// // src/redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../Ecommerce/redux/AuthSlice';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import comReducer from './redux/RootReducer/mainReducer';
 

const store = configureStore({
  reducer:comReducer
})

export default store;