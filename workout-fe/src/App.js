import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import { connect } from 'react-redux';
import PrivateRoute from "./utils/PrivateRoute.js";
// COMPONENTS
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import WorkoutList from './components/workouts/WorkoutList.js';
import SingleWorkout from './components/workouts/SingleWorkout';
import Nav from './components/NavBar/Nav';
import Footer from './components/Footer/Footer';
import { useLocation } from "react-router-dom";

function App(props) {
  const location = useLocation();
  // console.log('LOCATION', location)
  return (
    <div className="App">
      <div className="inner-container">
        {props.isFetching &&
        <div id="overlay" className="d-flex justify-content-center"  style={{height: "100%"}}>
          <div className="spinner-border" style={{width: "7rem", height: "7rem", alignSelf: "center", marginBottom: "8rem"}} role="status">
            <span className="sr-only">Loading...</span>
          </div> 
        </div>}
        {location.pathname !== '/' && location.pathname !== '/signup' ? <Nav/> : ''}
        {/* {props.error_message.data ? <Errors error_message={props.error_message}/> : ''} */}
        <Route exact path="/signup" component={Register}/>
        <Route exact path="/" component={Login}/>
        <PrivateRoute exact path="/workouts/:id/:name" component={SingleWorkout}/>
        <PrivateRoute exact path="/workouts" component={WorkoutList}/>
      </div>
      <Footer/>
    </div>
  );
}
const mapStateToProps = state => {
  // console.log("APP MTSP", state.isFetching);
  return {
    token: state.token,
    isFetching: state.isFetching,
    fetching: state.fetchMessage,
    error_message: state.error_message
  }
}
export default connect(mapStateToProps, {})(App);
