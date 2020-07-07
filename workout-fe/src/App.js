import React, { useEffect } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { history } from 'react-dom'
import './App.css';
import { connect } from 'react-redux';
import PrivateRoute from "./utils/PrivateRoute.js";

// COMPONENTS
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Workouts from './components/workouts/Workouts.js';

function App(props) {
  
  // useEffect(() => {
  //   if(props.isFetching === true){
  //     return <h2>LOADING PROPS</h2>
  //   }

  //   // if(props.token){
  //   //   history.push('/workouts')
      
  //   // }
  // })
  return (
    <div className="App">
      <Route exact path="/signup" component={Register}/>
      <Route exact path="/login" component={Login}/>
      <PrivateRoute exact path="/workouts" component={Workouts}/>
    </div>
  );
}
const mapStateToProps = state => {
  console.log("STATE", state);
  
  return {
    token: state.token,
    isFetching: state.isFetching,
    fetching: state.fetchMessage
  }
}
export default connect(mapStateToProps, {})(App);
