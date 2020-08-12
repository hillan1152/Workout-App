import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { singleWorkout, editWorkout, deleteWorkout, fetchExercises, userWorkouts, close } from '../../actions';
import ExerciseList from '../Exercises/ExerciseList';

import { EditWorkout } from './EditWorkout';


export const SingleWorkout = ({ match, userWorkouts, workout, singleWorkout, userId, changed, editWorkout, close, opened }) => {
  let workoutId = match.params.id;

  useEffect(() => {
      singleWorkout(workoutId);
      userWorkouts(userId);
  }, [changed])
  
  return (
    <div className="single-workout-container">
      {opened && <EditWorkout workout={workout} editWorkout={editWorkout} close={close}/>}
      <ExerciseList workoutId={workoutId}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log("MSTP -- SINGLE WORKOUT", state.workout.id);
  return {
    userId: state.user_id,
    workout: state.workout,
    exercise_list: state.exercises,
    error: state.error_message,
    changed: state.changed,
    opened: state.opened
  }
}


export default connect(mapStateToProps, { singleWorkout, editWorkout, deleteWorkout, fetchExercises, userWorkouts, close } )(SingleWorkout)

