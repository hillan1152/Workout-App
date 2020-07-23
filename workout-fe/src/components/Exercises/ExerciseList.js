import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PlusCircleOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import { fetchExercises, addExercise, editExercise, deleteExercise } from '../../actions'
import { capital } from '../../utils/helpers'
import moment from 'moment';

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

  const addExercise = e => {
    props.addExercise(props.workout.id, inputExercise);
  };

  const editSingleExercise = async e => {
    let reload = await props.fetchExercises(props.workout.id)
    let workoutId = props.workout.id;
    props.editExercise(deleteInfo.new_id, workoutId, inputExercise);
    return reload;
  };

  const removeExercise = async e => {
    e.preventDefault();
    props.deleteExercise(deleteInfo.id, props.workout.id);
    setToggleDelete(false);
  };

  const toggle = (id, className, data) => {
    setDeleteInfo({ name: data.exercise_name, id: data.user_exercise_id, new_id: data.exercise_id  })
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

  return (
    <div className="exercise-list-container">
      <div>
        <h2 onClick={() => props.setOpenWorkoutName(true)}>{capital(`${props.workout.name}`)}</h2>
        <PlusCircleOutlined style={{ fontSize: "1.5rem", color:"darkGreen", marginTop: "4%", marginLeft: "3%" }} onClick={() => setIsFormOpen(!isFormOpen)}/>
      </div>
      <h4>{moment(props.workout.date).format("dddd, MMMM Do")}</h4>
      {((exData || []).map(data => {
          return (
            <section className="exercise" key={data.user_exercise_id}>
              <EditFilled className="edit-icon" style={{ fontSize: "1.5rem", color:"orange", marginTop: "5%", marginLeft: "5%" }} onClick={() => toggle(data.exercise_id, "edit", data)}/>
              <section>
                <h3>{capital(`${data.exercise_name}`)}</h3>
                <p>{data.weight === 0 ? '' : `${data.weight}lbs `}{data.sets}x{data.reps}</p>
              </section>             
              <DeleteFilled className="delete-icon" type="button" style={{ fontSize: "1.5rem", color:"red", marginTop: "5%", marginRight: "5%"}} onClick={() => toggle(data.exercise_id, "delete", data)}/>
            </section>
          )
      }))}
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
  // console.log("MSTP EXERCISE LIST", state.exercises)
  return {
    info: state.info,
    workout: state.workout,
    error: state.error_message.data,
    exercises: state.exercises,
    fetchMessage: state.fetchMessage
  }
}


export default connect(mapStateToProps, { fetchExercises, addExercise, editExercise, deleteExercise })(ExerciseList)
