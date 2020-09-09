import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { userWorkouts, deleteWorkout } from '../../actions';
import moment from 'moment';
import { PlusCircleOutlined } from '@ant-design/icons';
import { addStyle } from '../../utils/helpers';
// COMPONENTS
import WorkoutForm from './WorkoutForm';
import DeleteWorkoutForm from './DeleteWorkoutForm';
import WorkoutCard from './WorkoutCard';
import { Pagination } from './Pagination';

export const WorkoutList = ({ info, userId, workout, userWorkouts, deleteWorkout, changed, error }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ openDelete, setOpenDelete ] = useState(false);
  const [ singleData, setSingleData ] = useState();
  // REFERENCE FOR SMOOTH SCROLL BEHAVIOR.
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
  
  // SET UP PAGINATION
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ workoutsPerPage, setworkoutsPerPage ] = useState(4);

  // GET CURRENT POST
  const indexOfLastPost = currentPage * workoutsPerPage;
  const indexOfFirstPost = indexOfLastPost - workoutsPerPage;
  const currentWorkouts = sorted_by_date.slice(indexOfFirstPost, indexOfLastPost);

  // CHANGE PAGE
  const paginate = pageNum => { setCurrentPage(pageNum) };

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
        {currentWorkouts.map(workout => {
          return (
            <WorkoutCard 
              key={workout.id}
              workout={workout}
              setSingleData={setSingleData}
              setOpenDelete={setOpenDelete}
            />)
        })}
        <Pagination 
          workoutsPerPage={workoutsPerPage} 
          totalWorkouts={sorted_by_date.length} 
          paginate={paginate}
        />
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
