import React, { useState } from 'react'
import { editExercise } from '../../actions'
import { connect } from 'react-redux'

export function EditExerciseForm(props) {
  const { exData } = props;
  const [ inputExercise, setInputExercise ] = useState({
    exercise: "",
    region: "",
    weight: 0,
    sets: 0,
    reps: 0
  })
  
  const handleChange = e => {
    setInputExercise({ ...inputExercise, [e.target.name]: e.target.value ? e.target.value: '' });
  };

  const editSingleExercise = e => {
    if(!inputExercise.exercise){
      inputExercise.exercise = exData.exercise;
    };
    if(!inputExercise.region){
      inputExercise.region = exData.region;
    };
    if(!inputExercise.weight){
      inputExercise.weight = exData.weight;
    };
    if(!inputExercise.sets){
      inputExercise.sets = exData.sets;
    };
    if(!inputExercise.reps){
      inputExercise.reps = exData.reps;
    };
    inputExercise.weight = parseInt(inputExercise.weight)
    inputExercise.sets = parseInt(inputExercise.sets)
    inputExercise.reps = parseInt(inputExercise.reps)
    props.editExercise(exData.exercise_id, props.workout.id, inputExercise);
  };
  return (
    <div className="forms align">
      <form onSubmit={editSingleExercise} >
        <h2>Edit An Exercise</h2>
        <input onChange={handleChange} placeholder={`${(exData || []).exercise}`} name="exercise"/>
        <input onChange={handleChange} placeholder={`${(exData || []).region}`} name="region"/>
        <input onChange={handleChange} type="number" placeholder={`Weight: ${(exData || []).weight}`} name="weight"/>
        <input onChange={handleChange} type="number" placeholder={`Sets: ${(exData || []).sets}`} name="sets"/>
        <input onChange={handleChange} type="number" placeholder={`Reps: ${(exData || []).reps}`} name="reps"/>
        <button type="submit">Edit</button>
      </form>
      <button onClick={() => props.closeForms()}>Cancel</button>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    workout: state.workout,
  }
}


export default connect(mapStateToProps, { editExercise })(EditExerciseForm)
