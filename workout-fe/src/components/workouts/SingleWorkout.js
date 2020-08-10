import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { singleWorkout, editWorkout, deleteWorkout, fetchExercises, userWorkouts } from '../../actions';
import { capital } from '../../utils/helpers';
import ExerciseList from '../Exercises/ExerciseList';

import { EditWorkout } from './EditWorkout';


export const SingleWorkout = ({ match, userWorkouts, workout, singleWorkout, userId, changed, editWorkout }) => {
  const [ openEditWorkout, setOpenEditWorkout ] = useState(false);

  let workoutId = match.params.id;

  useEffect(() => {
      singleWorkout(workoutId);
      userWorkouts(userId);
  }, [changed])
  
  return (
    <div className="single-workout-container align">
      <h2 onClick={() => setOpenEditWorkout(true)}>{capital(`${workout.name}`)}</h2>
      <ExerciseList workoutId={workoutId}/>
      {openEditWorkout && <EditWorkout workout={workout} setOpenEditWorkout={setOpenEditWorkout} editWorkout={editWorkout}/>}
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
    changed: state.changed
  }
}


export default connect(mapStateToProps, { singleWorkout, editWorkout, deleteWorkout, fetchExercises, userWorkouts } )(SingleWorkout)

