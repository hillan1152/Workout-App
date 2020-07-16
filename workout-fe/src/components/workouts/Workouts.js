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
  let future = [];
  let past = [];
  sorted_by_date.forEach(day => {
    if(moment(day.date).format('YYYYMMDD') >= moment().format('YYYYMMDD')){
      future.push(day)
    } else {
      past.push(day)
    }
  });

  useEffect(() => {
    // setLoading(!isFetching)
    userWorkouts(userId)
    setLoading(!isFetching)
  }, [])

  if (isFetching){
    return <h2>Gather Data</h2>
  }

  return (
    <div className="workout-container">
      <h2>Weekly Workouts</h2>
      {/* Loader */}
      {isFetching ? <div>Gathering Info....</div> : ""}

      {error_message.length > 0 ? alert(error_message.data) : ''}

      {/* Modal Form */}
      <button className="add_workout" onClick={() => setIsOpen(!isOpen)}>Add Workout</button>
      {isOpen ? <> <WorkoutForm setIsOpen={setIsOpen}/></> : ''}

      {sorted_by_date.map(workout => {
        return (
        <div className="individual_workout" key={workout.id}>
          <h3>{ moment(workout.date).calendar() }</h3>
          <p>{ capital(workout.name) }</p>
          <Link to={`/workouts/${workout.id}/${workout.name}`}>
            <button>
              Look
            </button>
            <button onClick={() => setIsEditOpen(!isEditOpen)}>
              Edit
            </button>
          </Link>
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
    info: state.info,
    error_message: state.error_message,
    token: state.token
  }
}



export default connect(mapStateToProps, { userWorkouts })(Workouts)
