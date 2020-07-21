import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchExercises, addExercise } from '../../actions'
export const ExerciseList =  (props) => {
  // const [ openEditExercise, setOpenEditExercise ] = useState(false);
  const [ inputExercise, setInputExercise ] = useState({
    name: "",
    region: "",
    weight: 0,
    sets: 0,
    reps: 0
  })
  const [ isFormOpen, setIsFormOpen ] = useState(false);

  const exData = (((props.exercises || {}).data || {}).exercises || []);
  const addExercise = e => {
    e.preventDefault();
    props.addExercise(props.workout.id, inputExercise);
    window.location.reload();
  };
  const handleChange = e => {
    setInputExercise({ ...inputExercise, [e.target.name]: e.target.value ? e.target.value: '' });
  };

  return (
    <div>
      <h2>{props.workout.name}</h2>
      {((exData || []).map(data => {
        return (
          <div key={data.user_exercise_id}>
            <section>
              <h3>{data.exercise_name}</h3>
              <p>{data.weight == 0 ? '' : `${data.weight}lbs :`} {data.sets} sets {data.reps} reps</p>
            </section>
            <button onClick={() => props.setOpenEditExercise(true)}>EDIT SIGN</button>
          </div>
        )
      }))}
      <button onClick={() => setIsFormOpen(!isFormOpen)}>PLUS SIGN</button>
      {isFormOpen && (
        <form onSubmit={addExercise} className="add-exercise-form">
          <input onChange={handleChange} placeholder="Exercise Name" name="name"/>
          <input onChange={handleChange} placeholder="Region" name="region"/>
          <input onChange={handleChange} placeholder="Weight" name="weight"/>
          <input onChange={handleChange} placeholder="Sets" name="sets"/>
          <input onChange={handleChange} placeholder="Reps" name="reps"/>
          <button type="submit">Add</button>
        </form>
      )}
      {props.openEditExercise && (
        <form onSubmit={""} className="edit-exercise-form">
        <input onChange={handleChange} placeholder="Exercise Name" name="name"/>
        <input onChange={handleChange} placeholder="Region" name="region"/>
        <input onChange={handleChange} placeholder="Weight" name="weight"/>
        <input onChange={handleChange} placeholder="Sets" name="sets"/>
        <input onChange={handleChange} placeholder="Reps" name="reps"/>
        <button type="submit">Edit</button>
      </form>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log("MSTP EXERCISE LIST", state.info.data.filter((type) => type === (typeof Array)))
  return {
    info: state.info,
    workout: state.workout,
    error: state.error,
    exercises: state.exercises
  }
}


export default connect(mapStateToProps, { fetchExercises, addExercise })(ExerciseList)
