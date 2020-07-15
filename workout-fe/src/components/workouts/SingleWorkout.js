import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { singleWorkout, editWorkout } from '../../actions';
import { capital } from '../../utils/helpers';
import Modal from './Modal';
// GET ALL EXERCISES W/ WORKOUT NAME
// DELETE A WORKOUT
// ADD AN EXERCISE
// EDIT AN EXERCISE


export const SingleWorkout = ({ match, singleWorkout, editWorkout, workout, userId, history, editId }) => {
  const [ modalOpen, setModalOpen ] = useState(false)
  const [ updateWorkout, setUpdateWorkout ] = useState({
    name: "",
    date: ""
  })
  let workoutId = match.params.id;
  
  useEffect(() => {
    singleWorkout(workoutId)
  }, [])
  
  // console.log(history)
  const handleChange = (e) => {
    setUpdateWorkout({ ...updateWorkout, [e.target.name]: e.target.value ? e.target.value: '' });
  };
  const submitEdit = (e) => {
    e.preventDefault();
    // setModalOpen(true)
    if(!updateWorkout.name){
      updateWorkout.name = workout.name
    }
    if(!updateWorkout.date){
      updateWorkout.date = moment(workout.date).calendar()
    } 
    editWorkout(workoutId, updateWorkout);
    history.goBack();
  };
  
  return (
    <div className="single-workout-container">
      {/* {modalOpen ? <Modal info={updateWorkout}/> : ''} */}
      <form>
        <input name="name" placeholder={capital(`${workout.name}`)} onChange={handleChange}></input>
        <label htmlFor="date">{moment(workout.date).calendar()}</label>
        <input name="date" type="date" onChange={handleChange}></input>
        {/* <input name="date" type="date" placeholder={moment(workout.date).calendar()} onChange={handleChange}></input> */}
        <button onClick={submitEdit}>Edit</button>
        <button>Delete</button>
      </form>
      <div>
        <h3>Exercises</h3>

      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log("MSTP -- SINGLE WORKOUT", state);
  return {
    userId: state.user_id,
    workout: state.workout,
    editId: state.workouts
  }
}


export default connect(mapStateToProps, { singleWorkout, editWorkout } )(SingleWorkout)

