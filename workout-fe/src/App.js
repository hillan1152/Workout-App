import React, { useEffect, useState } from 'react';
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
// import ExerciseList from './components/Login/Logout';
function App(props) {
  const [ isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if(!props.isFetching){
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="App">
      {isLoading &&
      <div id="overlay" className="d-flex justify-content-center" style={{height: "100vh"}} >
        <div className="spinner-border" style={{width: "7rem", height: "7rem", alignSelf: "center", marginBottom: "8rem"}} role="status">
          <span className="sr-only">Loading...</span>
        </div> 
      </div>}
      <>
      <Logout/>
      <Route exact path="/signup" component={Register}/>
      <Route exact path="/" component={Login}/>
      <PrivateRoute exact path="/workouts" component={Workouts}/>
      <PrivateRoute exact path="/workouts/:id/:name" component={SingleWorkout}/>
      </>
    </div>
  );
}
const mapStateToProps = state => {
  console.log("APP MTSP", state.isFetching);
  
  return {
    token: state.token,
    isFetching: state.isFetching,
    fetching: state.fetchMessage
  }
}
export default connect(mapStateToProps, {})(App);
