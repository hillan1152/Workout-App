import { axiosWithAuth } from '../utils/axiosWithAuth';

// EXPORT TYPES
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const ERROR = "ERROR";






const baseURL = "https://weight-lifting-journal1.herokuapp.com/";

export const userRegister = (user) => dispatch => {
  dispatch({ type: Authorizing, payload: "Signing up..."})
  axiosWithAuth().post(`${baseURL}/api/auth/register`)
    .then(res => dispatch({ type: REGISTER_SUCCESS, payload: res.data, user: user.email }))
    .catch(err => dispatch({ type: ERROR, payload: err.response.message }))
}