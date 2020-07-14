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
  
  // SORT ALL WORKOUTS BY DATE
  let sorted_by_date = info.sort((a, b) => {
    let x = new moment(a.date).format('YYYYMMDD');
    let y = new moment(b.date).format('YYYYMMDD');
    return x - y
  });

  // GATHER ALL FUTURE/PAST DATES
  let new_dates = [];
  let past = [];
  sorted_by_date.forEach(day => {
    if(moment(day.date).format('YYYYMMDD') >= moment().format('YYYYMMDD')){
      new_dates.push(day)
    } else {
      past.push(day)
    }
  });

    
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
      
      {new_dates.map(workout => {
        return (
        <div key={workout.id}>
          <p>{ capital(workout.name) }, { moment(workout.date).calendar() }</p>
          <Link to={`/workouts/${workout.id}`}>
            <button onClick={() => setIsEditOpen(!isEditOpen)}>
              Edit
            </button>
          </Link>
        </div>
        )
      }).slice(0, 7)}
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
