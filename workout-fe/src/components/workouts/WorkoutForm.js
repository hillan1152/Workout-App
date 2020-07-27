import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import moment from 'moment';

import { addWorkout } from '../../actions';
import { userWorkouts } from '../../actions';

function WorkoutForm({ addWorkout, userWorkouts, setIsOpen, userId }) {

  const [ workout, setWorkout ] = useState({
    name: "",
    date: ""
  });

  const handleChange = (e) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value ? e.target.value: '' });
  };
  
  // Submit Workout, Updates List, Closes Modal
  const handleSubmit = (e) => {
    e.preventDefault();
    workout.date = moment(workout.date).calendar();
    addWorkout(userId, workout);
    userWorkouts(userId);
    setIsOpen(false)
  };


  return (
    <form className="add-workout-form" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Workout Name" onChange={handleChange}/>
      <input type="date" name="date" placeholder="Date" onChange={handleChange}/>
      <button type="submit">Confirm Add</button>
    </form>
  )
}


const mapStateToProps = (state) => {
  console.log("MSTP FORM", state)
  return {
    userId: state.user_id,
    workouts: state.workouts,
    isFetching: state.isFetching, 
    error_message: state.error_message
  }
}



export default connect(mapStateToProps, { addWorkout, userWorkouts })(WorkoutForm)