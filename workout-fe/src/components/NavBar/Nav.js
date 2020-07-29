import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from "react-router-dom";

function Nav(props) {
  const location = useLocation();
  const { id, name } = props.workout;

  return (
    <div className="nav-align">
      <div className={`left-nav ${location.pathname === '/workouts' ? 'nav-location' : ''}`}>
        <h2>Workouts</h2>
      </div>
      <div className={`right-nav ${location.pathname === `/workouts/${id}/${name}` ? 'nav-location' : ''}`}>
        <h2>Exercises</h2>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  // console.log("NAV MTSP", state);
  return {
    workout: state.workout,
    error: state.error_message.data,
    exercises: state.exercises,
  }
}
export default connect(mapStateToProps, {})(Nav);