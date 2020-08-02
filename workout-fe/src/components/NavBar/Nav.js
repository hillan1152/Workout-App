import React from 'react';
import { connect } from 'react-redux';
import { useLocation, Link } from "react-router-dom";

function Nav(props) {
  const location = useLocation();
  const history = props;
  const { id, name } = props.workout;
  
  return (
    <div className="nav-align">
      <Link to={`/workouts`} className={`left-nav ${location.pathname === '/workouts' ? 'nav-location' : ''}`}>
          <h2>Workouts</h2>
      </Link>
      <div className={`right-nav ${location.pathname === `/workouts/${id}/${name}` ? 'nav-location' : ''}`} onClick={() => alert("Please select a Workout!")}>
        <h2>Exercises</h2>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  // console.log("NAV MTSP", state);
  return {
    workout: state.workout,
  }
}
export default connect(mapStateToProps, {})(Nav);