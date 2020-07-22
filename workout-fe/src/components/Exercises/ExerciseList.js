import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PlusCircleOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import { fetchExercises, addExercise, editExercise, deleteExercise } from '../../actions'
export const ExerciseList =  (props) => {
  const [ inputExercise, setInputExercise ] = useState({
    name: "",
    region: "",
    weight: 0,
    sets: 0,
    reps: 0
  })
  const [ editExerciseId, setEditExerciseId ] = useState();
  const [ deleteInfo, setDeleteInfo ] = useState();
  const [ isFormOpen, setIsFormOpen ] = useState(false);
  const [ toggleDelete, setToggleDelete ] = useState(false);
  const exData = (((props.exercises || {}).data || {}).exercises || []);
  const exerciseObj = new Set();

  const addExercise = e => {
    props.addExercise(props.workout.id, inputExercise);
    // window.location.reload();
  };

  const editSingleExercise = e => {
    // e.preventDefault();
    console.log(editExerciseId)
    let workoutId = props.workout.id;
    props.editExercise(deleteInfo.id, workoutId, inputExercise);
    // window.location.reload();
  };

  const removeExercise = (e) => {
    e.preventDefault();
    props.deleteExercise(deleteInfo.id);
    setToggleDelete(false);
    window.location.reload();
  };

  const toggle = (id, className, data) => {
    setDeleteInfo({ name: data.exercise_name, id: data.user_exercise_id })
    if(className === "edit") {
      if(toggleDelete) setToggleDelete(false);
      props.setOpenEditExercise(!props.openEditExercise);
      setEditExerciseId(id)
    }
    if(className === "delete") {
      if(props.openEditExercise) props.setOpenEditExercise(false);
      setToggleDelete(!toggleDelete);
    }
  };

  const handleChange = e => {
    setInputExercise({ ...inputExercise, [e.target.name]: e.target.value ? e.target.value: '' });
  };
  console.log("ERROR", props.error)
  return (
    <div>
      <h2>{props.workout.name}</h2>
      <PlusCircleOutlined style={{ fontSize: "2rem", color:"lightGreen" }} onClick={() => setIsFormOpen(!isFormOpen)}/>
      {((exData || []).map(data => {
        // ONLY ONE OF EACH WORKOUT ID
        // console.log("DATA", data)
        // if(!exerciseObj.has(data.exercise_id)){
        //   exerciseObj.add(data.exercise_id)
          return (
            <div key={data.user_exercise_id}>
              <section>
                <h3>{data.exercise_name}</h3>
                <p>{data.weight === 0 ? '' : `${data.weight}lbs :`} {data.sets} sets {data.reps} reps</p>
              </section>
              <EditFilled className="edit-icon" style={{ fontSize: "2rem", color:"yellow" }} onClick={() => toggle(data.exercise_id, "edit", data)}/>
              <DeleteFilled className="delete-icon" type="button" style={{ fontSize: "2rem", color:"red" }} onClick={() => toggle(data.exercise_id, "delete", data)}/>
            </div>
          )
      // }
      }))};
      {toggleDelete && (
        <div>
          <h2>Are you sure you want to delete {deleteInfo.name}</h2>
          <button onClick={removeExercise}>YES</button>
          <button onClick={() => toggle('', 'delete', '')}>Cancel</button>
        </div>
      )}
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
          <input onChange={handleChange} placeholder="Exercise Name" name="name"/>
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
    error: state.error_message.data,
    exercises: state.exercises,
    fetchMessage: state.fetchMessage
  }
}


export default connect(mapStateToProps, { fetchExercises, addExercise, editExercise, deleteExercise })(ExerciseList)
