import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { userLogin } from '../../actions';

export const Login = (props) => {
  
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
  }

  
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
    token: state.token
  }
}

export default connect(mapStateToProps, { userLogin })(Login)
