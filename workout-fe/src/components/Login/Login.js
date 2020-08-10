import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

// ACTIONS
import { userLogin } from '../../actions';

export const Login = (props) => {
  const [ user, setUser ] = useState({
    email: "",
    password: ""
  });
  
  useEffect(() => {
    if(props.token){
      props.history.push('/workouts')
    }

  }, [props.history, props.token])

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value ? e.target.value: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.userLogin(user);
    if(props.token){
      props.history.push('/workouts')
    } else {
      setUser('')
    }
  }
    
  if(props.error){
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome To Workout Journal</h2>
      <form onSubmit={handleSubmit}>
        <h2>Please Login</h2>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Enter Email" onChange={handleChange}/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
        <button type="submit">Submit</button>
        <h3>Need An Account?</h3>
        <Link to={'/signup'}>Register Here</Link>
      </form>
      {props.error ? <p className="err-message">{props.error.data.message}</p> : ''}
    </div>
  )
}

const mapStateToProps = state => {
  // console.log("MSTP LOGIN STATE", state)
  return {
    isFetching: state.isFetching,
    token: state.token,
    error: state.error_message
  }
}

export default connect(mapStateToProps, { userLogin })(Login)
