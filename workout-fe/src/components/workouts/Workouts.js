import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userWorkouts, deleteWorkout } from '../../actions';
import moment from 'moment';
import { capital } from '../../utils/helpers';
import { PlusCircleOutlined, DeleteFilled } from '@ant-design/icons';

// COMPONENTS
import WorkoutForm from './WorkoutForm';


export const Workouts = ({ info, userId, workout, userWorkouts, deleteWorkout, changed }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ openDelete, setOpenDelete ] = useState(false);
  const [ singleData, setSingleData ] = useState()
  
  useEffect(() => {
    userWorkouts(userId)
  }, [changed])

  // Confirms Removal and Sends Back to Workout Page
  const removeWorkout = (e) => {
    e.preventDefault();
    deleteWorkout(singleData.id);
    setOpenDelete(false);
    // location.reload()
  };
  // OPENS DELETE MODAL & ADDS DATA FOR MANIPULATION
  const deleteModal = (data) => {
    setOpenDelete(true);
    setSingleData(data)
  }
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
  return (
    <>
    {/* Modal Form */}
    <div className="align">
      {isOpen ? <WorkoutForm setIsOpen={setIsOpen} isOpen={isOpen} /> : ''}
      <PlusCircleOutlined style={{ fontSize: "3rem", color:"green", width: "100%", border: "none", marginTop: ".7rem"}} onClick={() => setIsOpen(!isOpen)}/>
    </div> 
    {/* DELETE TOGGLE */}
    {openDelete && (
      <section className="confirm-delete">
        <h3>Are you sure you want to delete {singleData.name}?</h3>
        <button onClick={removeWorkout}>Confirm Delete</button>
        <button onClick={() => setOpenDelete(false)}>Cancel</button>
      </section> 
    )}
    <div className={`workout-container ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(false)}>
      <h2 onClick={() => setIsOpen(false)}>Weekly Workouts</h2>
      {sorted_by_date.map(workout => {
        return (
        <div className="individual_workout" key={workout.id}>
          <Link to={`/workouts/${workout.id}/${workout.name}`} className="link">
            {/* <EditFilled className="edit-icon" style={{ fontSize: "1.5rem", color:"orange", alignSelf: 'center' }}/> */}
            <h3>{ moment(workout.date).calendar() }</h3>
            <p>{ capital(workout.name) }</p>
          </Link>
          <DeleteFilled className="delete-icon" type="button" style={{ fontSize: "1.5rem", color:"red", alignSelf: 'center' }} onClick={() => deleteModal(workout)}/>
        </div>
        )
      })}
    </div>
  </>
  )
}

const mapStateToProps = (state) => {
  // console.log("MSTP WORKOUTS", state)
  return {
    userId: state.user_id,
    workout: state.workout,
    isFetching: state.isFetching,
    info: state.info,
    error_message: state.error_message,
    token: state.token,
    exercises: state.exercises, 
    changed: state.changed
  }
}

export default connect(mapStateToProps, { userWorkouts, deleteWorkout })(Workouts)
