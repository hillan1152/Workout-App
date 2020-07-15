import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { singleWorkout } from '../../actions';
import { capital } from '../../utils/helpers';
// GET ALL EXERCISES W/ WORKOUT NAME
// DELETE A WORKOUT
// ADD AN EXERCISE
// EDIT AN EXERCISE


export const SingleWorkout = ({ match, singleWorkout, workout}) => {
  const [ modalOpen, setModalOpen ] = useState(false)
  
  let workoutId = match.params.id;
  
  useEffect(() => {
    singleWorkout(workoutId)
  }, [])

  
  return (
    <div>
      <form>
        <input name="name" placeholder={capital(`${workout.name}`)}></input>
        <input name="date" placeholder={moment(workout.date).calendar()}></input>
        <button>Confirm Edit</button>
        <button>Delete</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log("MSTP -- SINGLE WORKOUT", state);
  return {
    userId: state.user_id,
    workout: state.workout,
  }
}


export default connect(mapStateToProps, { singleWorkout } )(SingleWorkout)

