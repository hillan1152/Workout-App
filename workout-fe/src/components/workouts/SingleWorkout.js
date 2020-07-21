import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { singleWorkout, editWorkout, deleteWorkout, fetchExercises } from '../../actions';
import { capital } from '../../utils/helpers';
import Modal from './Modal';
import ExerciseList from '../Exercises/ExerciseList';

// ADD AN EXERCISE
// EDIT AN EXERCISE


export const SingleWorkout = ({ match, singleWorkout, editWorkout, deleteWorkout, workout, fetchExercises, exercise_list, history, error }) => {
  const [ openEdit, setOpenEdit ] = useState(false);
  const [ openDelete, setOpenDelete ] = useState(false);
  const [ updateWorkout, setUpdateWorkout ] = useState({
    name: "",
    date: ""
  })
  let workoutId = match.params.id;

  useEffect(() => {
      fetchExercises(workoutId)
      singleWorkout(workoutId)
  }, [])
  
  const handleChange = (e) => {
    setUpdateWorkout({ ...updateWorkout, [e.target.name]: e.target.value ? e.target.value: '' });
  };
  // Toggles all modals
  const toggleChange = (e) => {
    e.preventDefault();
    const target = e.target.name;
    if(target === "delete") setOpenDelete(true);
    
    if(e.target.className === "back-arrow") history.goBack();
    
    else if(target === "edit") {
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
      <button className="back-arrow" onClick={toggleChange}>BACK</button>
      {/* EDIT TOGGLE */}
      {openEdit && (
        <section>
          <p onClick={() => setOpenEdit(false)}>x</p>
          <h3>Are you sure you want these changes?</h3>
          <form onSubmit={submitEdit}>
            <p>Name: {updateWorkout.name}</p>
            <p>Date: {updateWorkout.date}</p>
            <button>Confirm</button>
          </form>
        </section> 
      )}
      {/* DELETE TOGGLE */}
      {openDelete && (
        <section>
          <p onClick={() => setOpenDelete(false)}>x</p>
          <h3>Are you sure you want to delete {workout.name}?</h3>
          <button onClick={removeWorkout}>Delete</button>
        </section> 
      )}
      {/* EDIT FORM: Modal Toggle*/}
      <form>
        <input name="name" placeholder={capital(`${workout.name}`)} onChange={handleChange}></input>
        <label htmlFor="date">{moment(workout.date).calendar()}</label>
        <input name="date" type="date" onChange={handleChange}></input>
        <button onClick={toggleChange} name="edit">Edit</button>
        <button onClick={toggleChange} name="delete">Delete</button>
      </form>
      <ExerciseList list={exercise_list.data}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log("MSTP -- SINGLE WORKOUT", state);
  return {
    userId: state.user_id,
    workout: state.workout,
    editId: state.workouts,
    exercise_list: state.info,
    error: state.error_message
  }
}


export default connect(mapStateToProps, { singleWorkout, editWorkout, deleteWorkout, fetchExercises } )(SingleWorkout)

