import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { StepBackwardFilled, DeleteFilled, EditFilled } from '@ant-design/icons';

import { singleWorkout, editWorkout, deleteWorkout, fetchExercises, userWorkouts } from '../../actions';
import { capital } from '../../utils/helpers';
import ExerciseList from '../Exercises/ExerciseList';



export const SingleWorkout = ({ match, userWorkouts, singleWorkout, userId, editWorkout, deleteWorkout, workout, history }) => {
  const [ openEdit, setOpenEdit ] = useState(false);
  const [ openWorkoutName, setOpenWorkoutName ] = useState(false);
  const [ openDelete, setOpenDelete ] = useState(false);
  const [ updateWorkout, setUpdateWorkout ] = useState({
    name: "",
    date: ""
  });
  let workoutId = match.params.id;

  useEffect(() => {
      singleWorkout(workoutId);
      userWorkouts(userId);
  }, [])
  
  const handleChange = (e) => {
    setUpdateWorkout({ ...updateWorkout, [e.target.name]: e.target.value ? e.target.value: '' });
  };

  // Toggles all modals
  const toggleChange = (className) => {

    if(className === "delete") {
      if(openEdit) setOpenEdit(false)
      setOpenDelete(true)
    }
    else if(className === "edit") {
      if(openDelete) setOpenDelete(false)
      setOpenEdit(true)
      if(!updateWorkout.name) updateWorkout.name = workout.name;
      if(!updateWorkout.date) updateWorkout.date = moment(workout.date).calendar();
    }
  }
  
  // Confirms Edit and Sends Back to Workout Page
  const submitEdit = (e) => {
    e.preventDefault();    
    if(updateWorkout.name === '') { 
      updateWorkout.name = workout.name
    };
    if(updateWorkout.date === '') {
      updateWorkout.name = workout.date;
    };
    editWorkout(workoutId, updateWorkout);
    setOpenEdit(false);
    history.goBack();
  };

  // Confirms Removal and Sends Back to Workout Page
  const removeWorkout = (e) => {
    e.preventDefault();
    deleteWorkout(workoutId);
    setOpenDelete(false);
    alert(`Successfully Deleted ${match.params.name} workout`)
    history.goBack();
  }

  return (
    <div className="single-workout-container">
      {/* <StepBackwardFilled style={{ color: 'white', fontSize: '2rem', flexDirection: 'start' }} onClick={() => history.push('/workouts')}/> */}
      {/* EDIT TOGGLE */}
      {openEdit && (
        <section className="confirm-edit">
          <p onClick={() => setOpenEdit(false)}>x</p>
          <h3>Are you sure you want these changes?</h3>
          <form onSubmit={submitEdit}>
            <p>Name: {updateWorkout.name}</p>
            <p>Date: {updateWorkout.date}</p>
            <button>Confirm Edit</button>
          </form>
        </section> 
      )}
      {/* DELETE TOGGLE */}
      {openDelete && (
        <section className="confirm-delete">
          <p onClick={() => setOpenDelete(false)}>x</p>
          <h3>Are you sure you want to delete {workout.name}?</h3>
          <button onClick={removeWorkout}>Confirm Delete</button>
        </section> 
      )}
      {/* EDIT FORM: Modal Toggle*/}
      {openWorkoutName && (
      
      <form className="workout-name-form">
        <p onClick={() => setOpenWorkoutName(false)}>X</p>
        <input name="name" placeholder={capital(`${workout.name}`)} onChange={handleChange}></input>
        <label htmlFor="date">{moment(workout.date).calendar()}</label>
        <input name="date" type="date" onChange={handleChange}></input>
        <div>
          <EditFilled style={{ fontSize: "2rem", color:"yellow" }} onClick={() => toggleChange("edit")} name="edit"/>
          <DeleteFilled style={{ fontSize: "2rem", color:"red" }} onClick={() => toggleChange("delete")} name="delete"/>
        </div>
      </form>
      )}
      <ExerciseList setOpenWorkoutName={setOpenWorkoutName} workoutId={workoutId}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log("MSTP -- SINGLE WORKOUT", state.workout.id);
  return {
    userId: state.user_id,
    workout: state.workout,
    exercise_list: state.exercises,
    error: state.error_message
  }
}


export default connect(mapStateToProps, { singleWorkout, editWorkout, deleteWorkout, fetchExercises, userWorkouts } )(SingleWorkout)

