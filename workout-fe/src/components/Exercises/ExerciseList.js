import React, { useState } from 'react';
import { connect } from 'react-redux';

import { fetchExercises, addExercise, editExercise, deleteExercise } from '../../actions'
export const ExerciseList =  (props) => {
  const [ inputExercise, setInputExercise ] = useState({
    name: "",
    region: "",
    weight: 0,
    sets: 0,
    reps: 0
  })
  const [ isFormOpen, setIsFormOpen ] = useState(false);
  const [ editExerciseId, setEditExerciseId ] = useState();
  const exData = (((props.exercises || {}).data || {}).exercises || []);
  

  const addExercise = e => {
    e.preventDefault();
    props.addExercise(props.workout.id, inputExercise);
    window.location.reload();
  };
  const editSingleExercise = e => {
    e.preventDefault();
    console.log("EDIT SINGLE EXERCISE", props.workout.id, editExerciseId)
    let workoutId = parseInt(props.workout.id)
    props.editExercise(editExerciseId, workoutId, inputExercise);
    // window.location.reload();
  };
  const removeExercise = (e) => {
    e.preventDefault();
    props.deleteExercise(parseInt(e.target.dataset.key));
    props.setOpenEditExercise(!props.openEditExercise);
    alert(`Successfully Deleted Exercise`)
    window.location.reload();
  }
  const toggleEdit = e => {
    props.setOpenEditExercise(!props.openEditExercise);
    setEditExerciseId(parseInt(e.target.dataset.key))
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
              <p>{data.weight === 0 ? '' : `${data.weight}lbs :`} {data.sets} sets {data.reps} reps</p>
            </section>
            <button data-key={data.user_exercise_id} data-ex={data.exercise_id} onClick={toggleEdit}>EDIT SIGN</button>
            <button data-key={data.user_exercise_id} onClick={removeExercise}>DELETE</button>
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
        <form onSubmit={editSingleExercise} className="edit-exercise-form">
          <input onChange={handleChange} placeholder={"Exercise Name"} name="name"/>
          <input onChange={handleChange} placeholder="Region" name="region"/>
          <input onChange={handleChange} type="number" placeholder="Weight" name="weight"/>
          <input onChange={handleChange} type="number" placeholder="Sets" name="sets"/>
          <input onChange={handleChange} type="number" placeholder="Reps" name="reps"/>
        <button type="submit">Edit</button>
        </form>
      )}
      
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log("MSTP EXERCISE LIST", state.exercises)
  return {
    info: state.info,
    workout: state.workout,
    error: state.error_message,
    exercises: state.exercises,
    fetchMessage: state.fetchMessage
  }
}


export default connect(mapStateToProps, { fetchExercises, addExercise, editExercise, deleteExercise })(ExerciseList)
