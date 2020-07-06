import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

// EXPORT TYPES
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const ERROR = "ERROR";
export const AUTHORIZING = "AUTHORIZING";


const baseURL = "https://weight-lifting-journal1.herokuapp.com";

export const userRegister = (user) => dispatch => {
  console.log("USER REGISTER -- ACTIONS", user)
  dispatch({ type: AUTHORIZING, payload: "Signing up..."})
  axios.post(`${baseURL}/api/auth/register`, user)
    .then(res => dispatch({ type: REGISTER_SUCCESS, payload: res.data, user: user.email }))
    .catch(err => dispatch({ type: ERROR, payload: err.response.message }))
}

export const userLogin = (user) => dispatch => {
  console.log("USER LOGIN -- ACTIONS", user)
  dispatch({ type: AUTHORIZING, payload: "Checking Login!" })
  axiosWithAuth().post(`${baseURL}/api/auth/login`, user)
    .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data, user: user.data }))
    .catch(err => dispatch({ type: ERROR, payload: err.response }))
}