import { combineReducers } from "redux";
import AuthReducer from "../Reducers/AuthReducer";
import CartReducer from "../Reducers/CartReducer";
 
 

const comReducer  =  combineReducers({
    auth: AuthReducer,
    cart : CartReducer
})

export default comReducer;