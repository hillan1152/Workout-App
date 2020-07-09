import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  FETCH_SUCCESS,
  FETCH_WORKOUT_SUCCESS,
  POST_WORKOUT_SUCCESS,
  AUTHORIZING,
  ERROR,
} from '../actions';

const initialState = {
  token: localStorage.getItem('token'),
  user_id: JSON.parse(localStorage.getItem('id')),
  isFetching: false,
  fetchMessage: "",
  error_message: "",
  info: [],
  workout: []
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
    case FETCH_SUCCESS:
      console.log("FETCH SUCCESS", action.payload)
      return {
        ...state,
        isFetching: false,
        info: action.payload,
      }
    case FETCH_WORKOUT_SUCCESS:
      console.log("FETCH WORKOUT SUCCESS", action.payload)
      return {
        ...state,
        isFetching: false,
        workout: action.payload,
      }
    case POST_WORKOUT_SUCCESS:
      console.log("POST WORKOUT SUCCESS", action.payload)
      return {
        ...state,
        isFetching: false,
        workouts: action.payload
      }
    case LOGIN_SUCCESS:
      // console.log("STATE", action.payload)
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('id', action.payload.userId);
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