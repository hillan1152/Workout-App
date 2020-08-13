import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userWorkouts, deleteWorkout } from '../../actions';
import moment from 'moment';
import { PlusCircleOutlined, DeleteFilled } from '@ant-design/icons';
import { addStyle, deleteStyle } from '../../utils/helpers';
// COMPONENTS
import WorkoutForm from './WorkoutForm';
import DeleteWorkoutForm from './DeleteWorkoutForm';
import WorkoutCard from './WorkoutCard';

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

  // SORT ALL WORKOUTS BY DATE
  let sorted_by_date = info.sort((a, b) => {
    let x = new moment(a.date).format('YYYYMMDD');
    let y = new moment(b.date).format('YYYYMMDD');
    return x - y
  });

  return (
    <section className="workouts-master" ref={fieldRef}>
      {/* Modal Form */}
      <PlusCircleOutlined className={`${isOpen || openDelete ? "active" : ""}`} style={{...addStyle}} onClick={() => setIsOpen(!isOpen)}/>
      {/* DELETE WORKOUT TOGGLE */}
      {openDelete && <DeleteWorkoutForm singleData={singleData} setOpenDelete={setOpenDelete} deleteWorkout={deleteWorkout}/>}
      {/* ADD WORKOUT TOGGLE */}
      {isOpen ? <WorkoutForm setIsOpen={setIsOpen} isOpen={isOpen} /> : ''}
      
      <div className={`workout-container ${isOpen || openDelete ? "active" : ""}`} onClick={() => setIsOpen(false)}>
        <h2>Weekly Workouts</h2>
        {sorted_by_date.map(workout => {
          return (
            <WorkoutCard 
              key={workout.id}
              workout={workout}
              setSingleData={setSingleData}
              setOpenDelete={setOpenDelete}
            />)
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
