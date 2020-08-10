import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userWorkouts, deleteWorkout } from '../../actions';
import moment from 'moment';
import { capital } from '../../utils/helpers';
import { PlusCircleOutlined, DeleteFilled } from '@ant-design/icons';

// COMPONENTS
import WorkoutForm from './WorkoutForm';
import DeleteWorkoutForm from './DeleteWorkoutForm';

export const WorkoutList = ({ info, userId, workout, userWorkouts, deleteWorkout, changed, error }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ openDelete, setOpenDelete ] = useState(false);
  const [ singleData, setSingleData ] = useState()
  
  const fieldRef = useRef(null);

  useEffect(() => {
    if(error && fieldRef.current){
      fieldRef.current.scrollIntoView({ behavior: "smooth" });
    }
    userWorkouts(userId)
  }, [changed, error])


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
    <section className="workouts-master" ref={fieldRef}>
      {/* Modal Form */}
      <PlusCircleOutlined style={{ fontSize: "3rem", color:"lightGreen", width: "100%", border: "none", marginTop: ".7rem"}} onClick={() => setIsOpen(!isOpen)}/>
      {/* DELETE WORKOUT TOGGLE */}
      {openDelete && <DeleteWorkoutForm singleData={singleData} setOpenDelete={setOpenDelete} deleteWorkout={deleteWorkout}/>}
      {/* ADD WORKOUT TOGGLE */}
      {isOpen ? <WorkoutForm setIsOpen={setIsOpen} isOpen={isOpen} /> : ''}
      <div className={`workout-container ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(false)}>
        <h2 onClick={() => setIsOpen(false)}>Weekly Workouts</h2>
        {sorted_by_date.map(workout => {
          return (
          <div className="individual_workout" key={workout.id}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'center'}}>
              <DeleteFilled className="delete-icon" type="button" style={{ fontSize: "1.5rem", color:"red", alignSelf: 'center'}} onClick={() => deleteModal(workout)}/>
              <div style={{ display: 'flex', marginLeft: '1.5rem'}}>
                <Link to={`/workouts/${workout.id}/${workout.name}`} className="link">
                  <h3>{ capital(workout.name) }</h3>
                  <p>{ moment(workout.date).format("dddd, MMMM Do") }</p>
                </Link>
              </div>
            </div>
          </div>
          )
        })}
      </div>

  </section>
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

export default connect(mapStateToProps, { userWorkouts, deleteWorkout })(WorkoutList)