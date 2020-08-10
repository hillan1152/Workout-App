import React, { useState } from 'react'
import { connect } from 'react-redux'
import { capital } from '../../utils/helpers';
import moment from 'moment';
import { editWorkout } from '../../actions';


export const EditWorkout = (props) => {
  const [ updateWorkout, setUpdateWorkout ] = useState({
    name: "",
    date: ""
  });

  const handleChange = (e) => {
    setUpdateWorkout({ ...updateWorkout, [e.target.name]: e.target.value ? e.target.value: '' });
  };

  // Confirms Edit and Sends Back to Workout Page
  const submitEdit = (e) => {
    e.preventDefault();    
    if(updateWorkout.name === '') { 
      updateWorkout.name = props.workout.name
    };
    if(updateWorkout.date === '') {
      updateWorkout.date = props.workout.date;
    };
    props.editWorkout(props.workout.id, updateWorkout);
    props.setOpenEditWorkout(false);
    // props.history.goBack();
  };
  return (
    <div className="forms">
      <form onSubmit={submitEdit}>
        <h2>Edit Workout Name</h2>
        <input onChange={handleChange} name="name" placeholder={capital(`${props.workout.name}`)}/>
        <label htmlFor="date">{moment(props.workout.date).format("dddd, MMMM Do")}</label>
        <input onChange={handleChange} name="date" type="date" />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => props.setOpenEditWorkout(false)}>Cancel</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log("EDIT WORKOUT", state)
  return {
    workout: state.workout,
  }
}


export default connect(mapStateToProps, { editWorkout: editWorkout })(EditWorkout)
