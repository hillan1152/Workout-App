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
  // NOT USED YET, SHOULD BE FOR PLACE HOLDERS
  const [ editExerciseId, setEditExerciseId ] = useState();
  // PASSES ALL EXERCISE DATA BETWEEN FORMS
  const [ exerciseData, setExerciseData ] = useState();
  // ADD FORM 
  const [ isFormOpen, setIsFormOpen ] = useState(false);
  // TOGGLE DELETE FORM
  const [ toggleDelete, setToggleDelete ] = useState(false);
  const exData = (((props.exercises || {}).data || {}).exercises || []);

  const addExercise = e => {
    props.addExercise(props.workout.id, inputExercise);
  };

  console.log("editExerciseId", editExerciseId)
  const editSingleExercise = async e => {
    let reload = await props.fetchExercises(props.workout.id)
    if(!inputExercise.name){
      inputExercise.name = props.exercises.name;
    };
    let workoutId = props.workout.id;
    props.editExercise(exerciseData.new_id, workoutId, inputExercise);
    return reload;
  };

  const removeExercise = async e => {
    e.preventDefault();
    props.deleteExercise(exerciseData.id, props.workout.id);
    setToggleDelete(false);
  };

  const closeForms = () => {
    setToggleDelete(false);
    setIsFormOpen(false);
    props.setOpenEditExercise(false);
  }

  const toggle = (id, className, data) => {
    if(data){
      setExerciseData({ name: data.exercise_name, id: data.user_exercise_id, new_id: data.exercise_id  })
      if(className === "edit") {
        if(toggleDelete || isFormOpen) setToggleDelete(false) && setIsFormOpen(false);
        props.setOpenEditExercise(!props.openEditExercise);
        setEditExerciseId(id)
      }
    }
    if(className === "delete") {
      if(props.openEditExercise || isFormOpen) props.setOpenEditExercise(false) && setIsFormOpen(false);
      setToggleDelete(!toggleDelete);
    }
  };

  const handleChange = e => {
    setInputExercise({ ...inputExercise, [e.target.name]: e.target.value ? e.target.value: '' });
  };

  return (
    <div className="exercise-list-container" >
      {isFormOpen && (
        <form onSubmit={addExercise} className="add-exercise-form align">
          <h2>Add An Exercise</h2>
          <input onChange={handleChange} placeholder="Exercise Name" name="name"/>
          <input onChange={handleChange} placeholder="Region" name="region"/>
          <input onChange={handleChange} placeholder="Weight" name="weight"/>
          <input onChange={handleChange} placeholder="Sets" name="sets"/>
          <input onChange={handleChange} placeholder="Reps" name="reps"/>
          <button type="submit">Add</button>
          <button onClick={() => toggle('', 'add', '')}>Cancel</button>
        </form>
      )}
      {toggleDelete && (
        <div className="add-exercise-form align">
          <h2>Are you sure you want to delete {exerciseData.name}</h2>
          <button onClick={removeExercise}>YES</button>
          <button onClick={() => toggle('', 'delete', '')}>Cancel</button>
        </div>
      )}
      {props.openEditExercise && (
        <div className="add-exercise-form align">
          <form onSubmit={editSingleExercise} >
            <h2>Edit An Exercise</h2>
            <input onChange={handleChange} placeholder={`Exercise Name ${(exData || []).exercise_name}`} name="name"/>
            <input onChange={handleChange} placeholder="Region" name="region"/>
            <input onChange={handleChange} type="number" placeholder="Weight" name="weight"/>
            <input onChange={handleChange} type="number" placeholder="Sets" name="sets"/>
            <input onChange={handleChange} type="number" placeholder="Reps" name="reps"/>
            <button type="submit">Edit</button>
          </form>
          <button onClick={() => closeForms()}>Cancel</button>
        </div>
      )}
      <h2 onClick={() => closeForms()}>{capital(`${props.workout.name}`)}</h2>
      <PlusCircleOutlined style={{ fontSize: "3rem", color:"darkGreen", marginTop: "2%" }} onClick={() => setIsFormOpen(!isFormOpen)}/>
      <div className={`exercise-list-container ${isFormOpen ? `active` : ''}`} >
        {/* <h2 className={isFormOpen ? `active` : ''} onClick={() => props.setOpenWorkoutName(true)}>{capital(`${props.workout.name}`)}</h2> */}

        <h4 className={isFormOpen ? `active` : ''}>{moment(props.workout.date).format("dddd, MMMM Do")}</h4>
        {((exData || []).map(data => {
            return (
              <section className={`exercise ${isFormOpen ? `active` : ''}`} key={data.user_exercise_id} onClick={() => setIsFormOpen(false)}>
                <EditFilled className="edit-icon" style={{ fontSize: "1.5rem", color:"orange", marginTop: "5%", marginLeft: "5%" }} onClick={() => toggle(data.exercise_id, "edit", data)}/>
                <section onClick={() => closeForms()}>
                  <h3>{capital(`${data.exercise_name}`)}</h3>
                  <p>{data.weight === 0 ? '' : `${data.weight}lbs `}{data.sets}x{data.reps}</p>
                </section>             
                <DeleteFilled className="delete-icon" type="button" style={{ fontSize: "1.5rem", color:"red", marginTop: "5%", marginRight: "5%"}} onClick={() => toggle(data.exercise_id, "delete", data)}/>
              </section>
            )
        }))}
      </div>  
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log("MSTP EXERCISE LIST", state.exercises)
  return {
    workout: state.workout,
    error: state.error_message.data,
    exercises: state.exercises,
    fetchMessage: state.fetchMessage
  }
}


export default connect(mapStateToProps, { fetchExercises, addExercise, editExercise, deleteExercise })(ExerciseList)
