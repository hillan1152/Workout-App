import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { userWorkouts } from '../../actions';


export const Workouts = (props) => {
  const [ loading, setLoading ] = useState(false);
  const [ workoutList, setWorkoutList ] = useState([]);
  const [ isOpen, setIsOpen ] = useState(false);

  // GET LIST OF WORKOUTS BY USERID
  useEffect(() => {
    setLoading(true)
    axiosWithAuth().get(`https://weight-lifting-journal1.herokuapp.com/api/workouts/${props.userId}`)
      .then(res => {
        setWorkoutList(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err.message);
        setLoading(false)
      })
      setLoading(false)
  }, [props.userId])


    
  return (
    <div className="workout-container">
      <h1>Here Are You Workouts This Week</h1>
      {workoutList.map(workout => {
        return (
        <div key={workout.id}>
          <p>{workout.name}, {workout.date}</p>
          <Link to={`/workouts/${workout.id}`}><button>Go To Workout</button></Link>
        </div>
        )
      })}
    </div> 
  )
}

const mapStateToProps = (state) => {
  console.log("MSTP WORKOUTS", state)
  return {
    userId: state.user_id,
    info: state.info,
    isFetching: state.isFetching
  }
}



export default connect(mapStateToProps, { userWorkouts })(Workouts)
