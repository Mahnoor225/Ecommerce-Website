export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
  });
  
  export const registerSuccess = (user) => ({
    type: 'REGISTER_SUCCESS',
    payload: user,
  });
  
  export const setEmail = (email) => ({
    type: 'SET_EMAIL',
    payload: email,
  });
  
  export const forgetPassword = (user) => ({
    type: 'FORGET_PASSWORD',
    payload: user,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  

export const addtoCart = (item) => {
    console.log("item in action",item)
    return {
        type: 'ADD_TO_CART',
        payload: item
    }
}

export const deleteCart = (item) => {
    return {
        type: 'delete_TO_CART',
        payload: item
    }
}