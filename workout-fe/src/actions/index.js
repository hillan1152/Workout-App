import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

// EXPORT TYPES
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const ERROR = "ERROR";
export const DELETE = "DELETE";
export const AUTHORIZING = "AUTHORIZING";

export const OPEN = "OPEN";
export const CLOSE = "CLOSE";
export const TOGGLE = "TOGGLE";

export const POST_WORKOUT_SUCCESS = "POST_WORKOUT_SUCCESS";
export const EDIT_WORKOUT_SUCCESS = "EDIT_WORKOUT_SUCCESS";
export const FETCH_WORKOUT_SUCCESS = "FETCH_WORKOUT_SUCCESS";

export const FETCH_EXERCISE_SUCCESS = "FETCH_EXERCISE_SUCCESS";
export const EDIT_EXERCISE_SUCCESS = "EDIT_EXERCISE_SUCCESS";
export const POST_EXERCISE_SUCCESS = "POST_EXERCISE_SUCCESS";


export const baseURL = "https://weight-lifting-journal1.herokuapp.com";


export const userRegister = (user) => dispatch => {
  // console.log("USER REGISTER -- ACTIONS", user)
  dispatch({ type: AUTHORIZING, payload: "Signing up..."})
  axios.post(`${baseURL}/api/auth/register`, user)
    .then(res => dispatch({ type: REGISTER_SUCCESS, payload: res.data, user: user.email }))
    .catch(err => dispatch({ type: ERROR, payload: err.response.message }))
}
  
export const userLogin = (user) => dispatch => {
  // console.log("USER LOGIN -- ACTIONS", user)
  if(user == null) return window.location.reload()
  dispatch({ type: AUTHORIZING, payload: "Checking Login!" })
  axiosWithAuth().post(`${baseURL}/api/auth/login`, user)
    .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data, user: user.data }))
    .catch(err => dispatch({ type: ERROR, payload: err.response }))
}
export const logout = () => {
  return { type: LOGOUT }
}
  // GET WORKOUTS -- PASS USER ID --> NOT USED
export const userWorkouts = (id) => dispatch => {
  // console.log("USER WORKOUTS -- ACTIONS", id)
  if(id == null) return window.location.reload()
  dispatch({ type: AUTHORIZING, payload: "Finding Workouts!" })
  axiosWithAuth().get(`${baseURL}/api/workouts/${id}`)
    .then(res => dispatch({ type: FETCH_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: ERROR, payload: err }))
}
// ADD WORKOUT -- PASS USER ID
export const addWorkout = (id, data) => dispatch => {
  dispatch({ type: AUTHORIZING, payload: "Posting Workout!" })
  axiosWithAuth().post(`${baseURL}/api/workouts/${id}`, data)
    .then(res => dispatch({ type: POST_WORKOUT_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: ERROR, payload: err.response }))
}
// GETS SINGLE WORKOUT --- PASS WORKOUT ID
export const singleWorkout = (id) => dispatch => {
  // console.log("SINGLE WORKOUT-- ACTIONS", id)
  dispatch({ type: AUTHORIZING, payload: "Finding Individual Workout!" })
  axiosWithAuth().get(`${baseURL}/api/workouts/single/${id}`)
    .then(res => dispatch({ type: FETCH_WORKOUT_SUCCESS, payload: res.data[0] }))
    .catch(err => dispatch({ type: ERROR, payload: err }))
}
// EDIT SINGLE WORKOUT -- PASS WORKOUT ID
export const editWorkout = (id, data) => dispatch => {
  // console.log("EDIT WORKOUT --- ACTION ", id, data)
  dispatch({ type: AUTHORIZING, payload: "Editing Workout!" })
  axiosWithAuth().put(`${baseURL}/api/workouts/${id}`, data)
    .then(res => dispatch({ type: EDIT_WORKOUT_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: ERROR, payload: err.response }))
}
// DELETE A SINGLE WORKOUT -- PASS WORKOUT ID
export const deleteWorkout = (id) => dispatch => {
  dispatch({ type: AUTHORIZING, payload: "Deleting Workout!" })
  axiosWithAuth().delete(`${baseURL}/api/workouts/${id}`)
    .then(res => dispatch({ type: DELETE, payload: res.data }))
    .catch(err => dispatch({ type: ERROR, payload: err.response }))
}

// EXERCISE DATA -- PASS WORKOUT ID
export const fetchExercises = (id) => dispatch => {
  // console.log("FETCH EXERCISES", id)
  dispatch({ type: AUTHORIZING, payload: "Fetching Exercise Data!" })
  axiosWithAuth().get(`${baseURL}/api/exercises/${id}`)
    .then(res => dispatch({ type: FETCH_EXERCISE_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: ERROR, payload: err.response }))
}
// ADD EXERCISE --  WORKOUT ID, DATA
export const addExercise = (id, data) => dispatch => {
  axiosWithAuth().post(`${baseURL}/api/exercises/${id}`, data)
    .then(res => dispatch({ type: POST_EXERCISE_SUCCESS }))
    .catch(err => dispatch({ type: ERROR, payload: err.response }))
}
// EDIT EXERCISE -- WORKOUT_ID & EXERCISE_ID
export const editExercise = (exercise_id, workout_id, data) => dispatch => {
  axiosWithAuth().put(`${baseURL}/api/exercises/${exercise_id}/workout/${workout_id}`, data)
    .then(res => dispatch({ type: EDIT_EXERCISE_SUCCESS, payload: data }))
    .catch(err => dispatch({ type: ERROR, payload: err.response }))
}

// DELETE EXERCISE -- id, workout_id
export const deleteExercise = (id, workout_id) => dispatch => {
  // console.log("ACTION DELETE EXERCISE", id, workout_id)
  // dispatch({ type: AUTHORIZING, payload: "Deleting Exercise!" })
  axiosWithAuth().delete(`${baseURL}/api/exercises/in_workout/${id}`)
    .then(res => dispatch({ type: DELETE, payload: res.data }))
    .catch(err => dispatch({ type: ERROR, payload: err.response }))
}

export const open = () => {
  return { type: OPEN }
}
export const close = () => {
  return { type: CLOSE }
}

export const toggleExercise = (index) => {
  return { type: TOGGLE, payload: [index] }
}