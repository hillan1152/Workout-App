import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userWorkouts } from '../../actions';
import moment from 'moment';
// COMPONENTS
import WorkoutForm from './WorkoutForm';


export const Workouts = ({ info, userId, userWorkouts, isFetching, history }) => {
  const [ loading, setLoading ] = useState(isFetching);
  const [ isOpen, setIsOpen ] = useState(false);
  
  // console.log(history)
  useEffect(() => {
    setLoading(!loading)
    userWorkouts(userId)
    setLoading(!loading)
  }, [])
  
  const editWorkout = () => {
    console.log("works")
  }

  return (
    <div className="workout-container">
      <h1>Here Are You Workouts This Week</h1>
      {/* Loader */}
      {isFetching ? <div>Gathering Info....</div> : ""}

      {/* Modal Form */}
      <button onClick={() => setIsOpen(!isOpen)}>Add Workout</button>
      {isOpen ? <> <WorkoutForm setIsOpen={setIsOpen}/></> : ''}

      {info.map(workout => {
        return (
        <div key={workout.id}>
          <p>{workout.name}, {moment(workout.date).calendar()}</p>
          <Link to={`/workouts/${workout.id}`}><button>Go To Workout</button></Link>
          <button onClick={editWorkout}>Edit Workout</button>
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
