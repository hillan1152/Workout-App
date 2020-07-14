import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { userLogin } from '../../actions';

export const Login = (props) => {
  
  useEffect(() => {
    if(props.token){
      props.history.push('/workouts')
    }

  }, [props.history, props.token, props.error.data])

  const [ user, setUser ] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value ? e.target.value: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.userLogin(user);
    if(props.token){
      props.history.push('/workouts')
    }
  }

  if(props.isFetching){
    return <h2>Signing In</h2>
  } 
  if (props.error.status === 401){
    return <h2>{props.error.data.message}</h2>
  }
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Please Login</h2>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Enter Email" onChange={handleChange}/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  console.log("MSTP LOGIN STATE", state)
  return {
    isFetching: state.isFetching,
    token: state.token,
    error: state.error_message
  }
}

export default connect(mapStateToProps, { userLogin })(Login)
