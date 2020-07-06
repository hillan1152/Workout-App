import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { userRegister } from '../../actions';

export const Register = () => {
  const [ user, setUser ] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value ? e.target.value: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userRegister(user);
  }

  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Enter Email" onChange={handleChange}/>
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
      </form>
    </div>
  )
}

export default connect(null, { userRegister })(Register)
