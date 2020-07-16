import React, { useEffect } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import './App.scss';
import { connect } from 'react-redux';
import PrivateRoute from "./utils/PrivateRoute.js";

// COMPONENTS
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Workouts from './components/workouts/Workouts.js';
import SingleWorkout from './components/workouts/SingleWorkout';
import Logout from './components/Login/Logout';
function App(props) {
  
  return (
    <div className="App">
      <Logout/>
      <Route exact path="/signup" component={Register}/>
      <Route exact path="/" component={Login}/>
      <PrivateRoute exact path="/workouts" component={Workouts}/>
      <PrivateRoute exact path="/workouts/:id/:name" component={SingleWorkout}/>
    </div>
  );
}
const mapStateToProps = state => {
  // console.log("STATE", state);
  
  return {
    token: state.token,
    isFetching: state.isFetching,
    fetching: state.fetchMessage
  }
}
export default connect(mapStateToProps, {})(App);
