import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { userWorkouts } from '../../actions';

// COMPONENTS
import WorkoutForm from './WorkoutForm';


export const Workouts = (props) => {
  const [ loading, setLoading ] = useState(props.isFetching);
  const [ workoutList, setWorkoutList ] = useState([]);
  const [ isOpen, setIsOpen ] = useState(false);

  useEffect(() => {
    setLoading(!props.isFetching)
    axiosWithAuth().get(`https://weight-lifting-journal1.herokuapp.com/api/workouts/${props.userId}`)
      .then(res => {
        setWorkoutList(res.data)
        setLoading(!props.isFetching)
      })
      .catch(err => {
        console.log(err.message);
        setLoading(!props.isFetching)
      })
      setLoading(!props.isFetching)
    }, [])
    
  return (
    <div className="workout-container">
      <h1>Here Are You Workouts This Week</h1>
      <button onClick={() => setIsOpen(!isOpen)}>Add Workout</button>
      {workoutList.map(workout => {
        return (
        <div key={workout.id}>
          <p>{workout.name}, {workout.date}</p>
          <Link to={`/workouts/${workout.name}`}><button>Go To Workout</button></Link>
        </div>
        )
      })}

      {isOpen ? 
        <>
          <WorkoutForm/>
        </> : ''}
    </div> 
  )
}

const mapStateToProps = (state) => {
  console.log("MSTP WORKOUTS", state)
  return {
    userId: state.user_id,
    isFetching: state.isFetching,
  }
}



export default connect(mapStateToProps, {})(Workouts)
