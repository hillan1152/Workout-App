import React, { useState } from 'react';
import { connect } from 'react-redux'
import { addExercise } from '../../actions'

export const AddExerciseForm = (props) => {
  const [ inputExercise, setInputExercise ] = useState({
    exercise: "",
    region: "",
    weight: 0,
    sets: 0,
    reps: 0
  })  

  const submitExercise = e => {
    e.preventDefault();
    if(!inputExercise.exercise || !inputExercise.region || !inputExercise.weight || !inputExercise.sets || !inputExercise.reps){
      alert("Please Complete Form")
    };
    inputExercise.weight = parseInt(inputExercise.weight)
    inputExercise.sets = parseInt(inputExercise.sets)
    inputExercise.reps = parseInt(inputExercise.reps)
    props.addExercise(props.workout.id, inputExercise)
    props.closeForms();
  };
  
  const handleChange = e => {
    setInputExercise({ ...inputExercise, [e.target.name]: e.target.value ? e.target.value: '' });
  };
  return (
    <div className="forms add-workout">
      <form onSubmit={submitExercise}>
        <h2>Add An Exercise</h2>
        <input onChange={handleChange} placeholder="Exercise Name" name="exercise"/>
        <input onChange={handleChange} placeholder="Region" name="region"/>
        <section>
          <input onChange={handleChange} type="number" placeholder="Wt" name="weight"/>
          <input onChange={handleChange} type="number" placeholder="Sets" name="sets"/>
          <input onChange={handleChange} type="number" placeholder="Reps" name="reps"/>
        </section>
        <button type="submit">Add</button>
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



export default connect(mapStateToProps, { addExercise })(AddExerciseForm)
