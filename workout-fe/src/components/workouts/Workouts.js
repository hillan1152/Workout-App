import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userWorkouts } from '../../actions';
import moment from 'moment';
import { capital } from '../../utils/helpers';
import { PlusCircleOutlined } from '@ant-design/icons';
// COMPONENTS
import WorkoutForm from './WorkoutForm';




export const Workouts = ({ info, userId, userWorkouts, error_message, exercises }) => {
  const [ isOpen, setIsOpen ] = useState(true);
  
  useEffect(() => {
    userWorkouts(userId)
  }, [userWorkouts, userId])

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
  console.log(exercises)
  return (
    <div className="workout-container">
      {/* Modal Form */}
      {isOpen ? <> <WorkoutForm setIsOpen={setIsOpen}/></> : ''}
      <h2>Weekly Workouts</h2>
      <PlusCircleOutlined style={{ fontSize: "2rem", color:"lightGreen", width: "100", border: "none", marginTop: ".7rem"}} onClick={() => setIsOpen(!isOpen)}/>
      {/* {error_message.length > 0 ? alert(error_message.data) : ''} */}


      {sorted_by_date.map(workout => {
        return (
        <div className="individual_workout" key={workout.id}>
          <Link to={`/workouts/${workout.id}/${workout.name}`} className="link">
            <h3>{ moment(workout.date).calendar() }</h3>
            <p>{ capital(workout.name) }</p>
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
    token: state.token,
    exercises: state.exercises
  }
}

export default connect(mapStateToProps, { userWorkouts })(Workouts)
