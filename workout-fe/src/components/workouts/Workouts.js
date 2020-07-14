import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userWorkouts } from '../../actions';
import moment from 'moment';
import { capital } from '../../utils/helpers'
// COMPONENTS
import WorkoutForm from './WorkoutForm';




export const Workouts = ({ info, userId, userWorkouts, isFetching, error_message, token }) => {
  const [ loading, setLoading ] = useState(false);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ isEditOpen, setIsEditOpen ] = useState(false);
  
  // console.log(history)
  useEffect(() => {
    setLoading(!isFetching)
    userWorkouts(userId)
    setLoading(!isFetching)
  }, [])

  if (isFetching){
    return <h2>Gather Data</h2>
  }

  return (
    <div className="workout-container">
      <h1>Here Are You Workouts This Week</h1>
      {/* Loader */}
      {isFetching ? <div>Gathering Info....</div> : ""}

      {error_message.length > 0 ? alert(error_message.data) : ''}

      {/* Modal Form */}
      <button onClick={() => setIsOpen(!isOpen)}>Add Workout</button>
      {isOpen ? <> <WorkoutForm setIsOpen={setIsOpen}/></> : ''}

      {/* {isEditOpen ? <SingleWorkout setIsEditOpen={setIsEditOpen} capital={capital}/> : ""} */}
      


      {info.map(workout => {
        return (
        <div key={workout.id}>
          <p>{ capital(workout.name) }, { moment(workout.date).calendar() }</p>
          <button onClick={() => setIsEditOpen(!isEditOpen)}>Go To Workout</button>
          <Link to={`/workouts/${workout.id}`}>
            <button onClick={() => setIsEditOpen(!isEditOpen)}>
              Go To Workout
            </button>
          </Link>
          {/* <button type="click" >Edit Workout</button> */}
          {/* {isEditOpen && <EditForm/>} */}
          {/* Edit workout form */}

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
    isFetching: state.isFetching,
    info: state.info,
    error_message: state.error_message,
    token: state.token
  }
}



export default connect(mapStateToProps, { userWorkouts })(Workouts)
