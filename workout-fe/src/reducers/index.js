import {
  AUTHORIZING,
  REGISTER_SUCCESS,
  ERROR,
  LOGIN_SUCCESS
} from '../actions';

const initialState = {
  user_email: JSON.parse(localStorage.getItem('email')),
  token: JSON.parse(localStorage.getItem('token')),
  isFetching: false,
  fetchMessage: "",
  error_message: "",
}

export const reducer = (state = initialState, action) => {
  switch(action.type){
    case AUTHORIZING:
      return {
        ...state,
        isFetching: true,
        fetchMessage: action.payload
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetchMessage: ""
      }
    case LOGIN_SUCCESS:
      console.log("STATE", action.payload)
      localStorage.setItem('token', action.payload);
      localStorage.setItem('id', action.payload.user_Id);
      return {
        ...state,
        isFetching: false,
        fetchMessage: action.payload.message,
      }
    case ERROR:
      return {
        ...state,
        error_message: action.payload
      }
    default: 
      return state;
  }
}