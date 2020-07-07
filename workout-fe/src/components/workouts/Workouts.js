import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { userWorkouts } from '../../actions';


export const Workouts = (props) => {
  const [ loading, setLoading ] = useState(false);
  const [ workoutList, setWorkoutList ] = useState([])

  useEffect(() => {
    setLoading(true)
    axiosWithAuth().get(`https://weight-lifting-journal1.herokuapp.com/api/workouts/${props.userId}`)
      .then(res => {
        setWorkoutList(res.data)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
      })
  }, [props.userId])

  if(loading === true){
    return <h2>Gathering Workouts</h2>
  }
  
  return (
    <div>
      <h1>HERE WE GO</h1>
      {workoutList.map(workout => {
        return (
        <p key={workout.id}>{workout.name}, {workout.date}</p>
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
  }
}



export default connect(mapStateToProps, { userWorkouts })(Workouts)
