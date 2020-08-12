import React, { useState } from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { userRegister } from '../../actions';

export const Register = ({ userRegister, history }) => {
  const [ user, setUser ] = useState({
    email: "",
    password: "",
    reEnter:''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value ? e.target.value: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(user.password !== user.reEnter){
      return alert('Your Passwords Do Not Match. Try Again!')
    } 
    if(!user.email.includes('@')){
      return alert('Not a Valid Email')
    }
    userRegister(user);
  };
  
  return (
    <div className="reg-form-container">
      <div className="reg-form">
        <form onSubmit={handleSubmit}>
          <h2>Register Here</h2>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter Email" onChange={handleChange}/>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
          <label htmlFor="re-enter">Re-Enter Password</label>
          <input type="password" name="re-enter" placeholder="Password" onChange={handleChange}/>
          <button type="submit">Register</button>
        </form>
        <button onClick={() => history.goBack()}>Cancel</button>
      </div>
    </div>
  )
}

export default connect(null, { userRegister })(Register)
