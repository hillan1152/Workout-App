import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { userWorkouts } from '../../actions';

// COMPONENTS
import WorkoutForm from './WorkoutForm';


export const Workouts = ({ info, userId, userWorkouts, isFetching }) => {
  const [ loading, setLoading ] = useState(isFetching);
  const [ workoutList, setWorkoutList ] = useState([]);
  const [ isOpen, setIsOpen ] = useState(false);

  useEffect(() => {
    userWorkouts(userId)
  }, [])
    
  return (
    <div className="workout-container">
      <h1>Here Are You Workouts This Week</h1>
      <button onClick={() => setIsOpen(!isOpen)}>Add Workout</button>
      {isOpen ? 
      <>
        <WorkoutForm setIsOpen={setIsOpen}/>
      </> : ''}
      {info.map(workout => {
        return (
        <div key={workout.id}>
          <p>{workout.name}, {workout.date}</p>
          <Link to={`/workouts/${workout.name}`}><button>Go To Workout</button></Link>
        </div>
        )
      })}
    </div> 
  )
}

const mapStateToProps = (state) => {
  // console.log("MSTP WORKOUTS", state)
  return {
    userId: state.user_id,
    isFetching: state.isFetching,
    info: state.info
  }
}



export default connect(mapStateToProps, { userWorkouts })(Workouts)
