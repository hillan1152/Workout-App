import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  FETCH_SUCCESS,
  FETCH_WORKOUT_SUCCESS,
  POST_WORKOUT_SUCCESS,
  EDIT_WORKOUT_SUCCESS,
  DELETE_WORKOUT_SUCCESS,
  FETCH_EXERCISE_SUCCESS,
  AUTHORIZING,
  ERROR,
} from '../actions';

const initialState = {
  token: localStorage.getItem('token'),
  user_id: localStorage.getItem('id'),
  isFetching: false,
  fetchMessage: "",
  error_message: "",
  info: [],
  workout: [],
  exercises: []
}

export const reducer = (state = initialState, action) => {
  switch(action.type){
    case AUTHORIZING:
      // console.log("Authorizing");
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
      // console.log("FETCH SUCCESS", action.payload)
      return {
        ...state,
        isFetching: false,
        info: action.payload,
      }
    case FETCH_WORKOUT_SUCCESS:
      // console.log("FETCH WORKOUT SUCCESS", action.payload)
      return {
        ...state,
        isFetching: false,
        workout: action.payload,
      }
    case FETCH_EXERCISE_SUCCESS:
      // console.log("FETCH WORKOUT SUCCESS", action.payload)
      return {
        ...state,
        isFetching: false,
        exercises: action.payload,
      }
    case POST_WORKOUT_SUCCESS:
      // console.log("POST WORKOUT SUCCESS", action.payload)
      return {
        ...state,
        isFetching: false,
        workouts: action.payload
      }
    case EDIT_WORKOUT_SUCCESS:
      // console.log("EDIT WORKOUT SUCCESS", action.payload)
      return {
        ...state,
        isFetching: false,
        workouts: action.payload
      }
    case DELETE_WORKOUT_SUCCESS:
      // console.log("DELETE_WORKOUT_SUCCESS", action.payload)
      return {
        ...state,
        isFetching: false,
        workout: action.payload
      }
    case LOGIN_SUCCESS:
      // console.log("STATE", action.payload)
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('id', action.payload.userId);
      return {
        ...state,
        isFetching: false,
        token: localStorage.getItem('token', action.payload.token),
        // user_id: localStorage.getItem('id', action.payload.userId),
        fetchMessage: action.payload.message,
      }
    case LOGOUT:
      localStorage.clear();
      window.location.reload();
      return {
        ...state, token: ""
      }
    case ERROR:
      return {
        ...state,
        isFeching: false,
        error_message: action.payload
      }
    default: 
      return state;
  }
}