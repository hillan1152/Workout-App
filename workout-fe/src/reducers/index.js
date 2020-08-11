import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  FETCH_SUCCESS,
  FETCH_WORKOUT_SUCCESS,
  POST_WORKOUT_SUCCESS,
  EDIT_WORKOUT_SUCCESS,
  FETCH_EXERCISE_SUCCESS,
  POST_EXERCISE_SUCCESS,
  EDIT_EXERCISE_SUCCESS,
  AUTHORIZING,
  ERROR,
  DELETE, 
  OPEN,
  CLOSE, 
  TOGGLE
} from '../actions';

const initialState = {
  token: localStorage.getItem('token'),
  user_id: localStorage.getItem('id'),
  isFetching: false,
  fetchMessage: "",
  error_message: "",
  info: [],
  toggleTracker: [],
  workout: [],
  exercises: [],
  changed: false,
  opened: false
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
    case DELETE:
      console.log("DELETE", action.payload);
      return {
        ...state,
        isFetching: false,
        fetchMessage: action.payload,
        changed: true
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
        changed: false
      }
    case FETCH_WORKOUT_SUCCESS:
      // console.log("FETCH WORKOUT SUCCESS", action.payload)
      return {
        ...state,
        isFetching: false,
        workout: action.payload,
        changed: false
      }
    case FETCH_EXERCISE_SUCCESS:
      console.log("FETCH EXERCISE SUCCESS", action.payload)
      return {
        ...state,
        isFetching: false,
        exercises: action.payload,
        changed: false
      }
    case POST_WORKOUT_SUCCESS:
      console.log("POST WORKOUT SUCCESS", action.payload)
      // debugger
      return {
        ...state,
        isFetching: false,
        workouts: action.payload,
        changed: true
      }
    case EDIT_EXERCISE_SUCCESS:
      console.log("EDIT EXERCISE SUCCESS", state)
      return {
        ...state,
        isFetching: false,
        changed: true
    }
    case POST_EXERCISE_SUCCESS:
      console.log("POST EXERCISE SUCCESS", action.payload)
      return {
        ...state,
        isFetching: false,
        changed: true
    }
    case EDIT_WORKOUT_SUCCESS:
      console.log("EDIT WORKOUT SUCCESS", action.payload)
      return {
        ...state,
        isFetching: false,
        workout: action.payload,
        changed: true
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
      console.log("ERROR", action.payload)
      // debugger
      return {
        ...state,
        isFetching: false,
        error_message: action.payload
    }
    case OPEN:
      return {
        ...state,
        opened: true
    }
    case CLOSE:
      return {
        ...state,
        opened: false
    }
    case TOGGLE: 
      return {
        ...state,
        toggleTracker: action.payload
      }
    default: 
      return state;
    }
}