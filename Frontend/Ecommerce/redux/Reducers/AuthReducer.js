import Cookies from 'js-cookie';

// Initial State
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

// Reducer
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
      };

    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
      };

    case 'SET_EMAIL':
      return {
        ...state,
        user: {
          ...(state.user || {}),
          email: action.payload,
        },
      };

    case 'FORGET_PASSWORD':
      return {
        ...state,
        user: action.payload,
      };

    case 'LOGOUT':
      Cookies.remove('authToken');
      Cookies.remove('userEmail');
      Cookies.remove('userName');
      Cookies.remove('userAvatar');
      Cookies.remove('userid');
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default AuthReducer;
