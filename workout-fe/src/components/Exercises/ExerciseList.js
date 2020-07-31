import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { PlusCircleOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import { fetchExercises, addExercise, editExercise, deleteExercise, singleWorkout } from '../../actions'
import { capital } from '../../utils/helpers'
import moment from 'moment';
import { AddExerciseForm } from './AddExerciseForm';
import DeleteExerciseForm from './DeleteExerciseForm';
import EditExerciseForm from './EditExerciseForm';

export const ExerciseList =  (props) => {
  const [ inputExercise, setInputExercise ] = useState({
    name: "",
    region: "",
    weight: 0,
    sets: 0,
    reps: 0
  })
  // PASSES ALL EXERCISE DATA BETWEEN FORMS
  const [ exerciseData, setExerciseData ] = useState();
  // OPEN ADD FORM 
  const [ isAddFormOpen, setIsAddFormOpen ] = useState(false);
  // OPEN DELETE FORM
  const [ isDeleteOpen, setIsDeleteOpen ] = useState(false);
  // OPEN EDIT FORM 
  const [ isEditOpen, setIsEditOpen ] = useState(false);

  const exData = (((props.exercises || {}).data || {}).exercises || []);

  useEffect(() => {
    props.fetchExercises(props.workoutId)
  }, []);

  const submitExercise = e => {
    props.addExercise(props.workout.id, inputExercise);
  };

  const editSingleExercise = e => {
    console.log(!inputExercise.name)
    if(!inputExercise.name){
      inputExercise.name = exerciseData.exercise_name;
    };
    if(!inputExercise.region){
      inputExercise.region = exerciseData.region;
    };
    if(!inputExercise.weight){
      inputExercise.weight = exerciseData.weight;
    };
    if(!inputExercise.sets){
      inputExercise.sets = exerciseData.sets;
    };
    if(!inputExercise.reps){
      inputExercise.reps = exerciseData.reps;
    };
    let workoutId = props.workout.id;
    props.editExercise(exerciseData.exercise_id, workoutId, inputExercise);
  };

  const removeExercise = async e => {
    let reload = await props.singleWorkout(props.userId)
    props.deleteExercise(exerciseData.user_exercise_id, props.workout.id);
    setIsDeleteOpen(false);
    return reload;
  };

  const closeForms = () => {
    setIsDeleteOpen(false);
    setIsAddFormOpen(false);
    setIsEditOpen(false);
  };

  const toggle = (name, data) => {
    setExerciseData(data)
    if(name == 'edit'){
      setIsEditOpen(true)
      setIsAddFormOpen(false);
      setIsDeleteOpen(false);
    } else if(name == 'delete'){
      setIsDeleteOpen(true)
      setIsAddFormOpen(false);
      setIsEditOpen(false);
    } 
  }

  return (
    <div className="exercise-list-container" >
      {isAddFormOpen && <AddExerciseForm closeForms={closeForms} submitExercise={submitExercise} setInputExercise={setInputExercise} inputExercise={inputExercise}/>}
      
      {isDeleteOpen && <DeleteExerciseForm closeForms={closeForms} removeExercise={removeExercise}  data={exerciseData} setIsDeleteOpen={setIsDeleteOpen}/>}
      
      {isEditOpen && <EditExerciseForm closeForms={closeForms} editSingleExercise={editSingleExercise} setInputExercise={setInputExercise} inputExercise={inputExercise} exData={exerciseData}/>}
      
      <div className={`${isAddFormOpen || isDeleteOpen || isEditOpen ? `active` : ''}`} style={{ display: 'flex', justifyContent: 'center', justifyContent: 'space-evenly' }} onClick={() => closeForms()}>
        <EditFilled className="edit-icon" style={{ fontSize: "1.5rem", color:"orange", alignSelf: 'center' }}/>
        <h2 >{capital(`${props.workout.name}`)}</h2>
        <DeleteFilled className="delete-icon" type="button" style={{ fontSize: "1.5rem", color:"red", alignSelf: 'center' }} />
      </div>

      <PlusCircleOutlined style={{ fontSize: "3rem", color:"darkGreen", marginTop: "2%" }} onClick={() => setIsAddFormOpen(true)}/>
      
      <div className={`exercise-list-container ${isAddFormOpen || isDeleteOpen || isEditOpen ? `active` : ''}`}>
        <h4 className={isAddFormOpen ? `active` : ''}>{moment(props.workout.date).format("dddd, MMMM Do")}</h4>
        {((exData || []).map(data => {
          return (
            <section className={`exercise ${isAddFormOpen || isDeleteOpen || isEditOpen ? `active` : ''}`} key={data.user_exercise_id} onClick={() => setIsAddFormOpen(false)}>
              <EditFilled className="edit-icon" style={{ fontSize: "1.5rem", color:"orange", marginTop: "5%", marginLeft: "5%" }} onClick={() => toggle("edit", data)}/>
              <section onClick={() => closeForms()}>
                <h3>{capital(`${data.exercise_name}`)}</h3>
                <p>{data.weight === 0 ? '' : `${data.weight}lbs `}{data.sets}x{data.reps}</p>
              </section>             
              <DeleteFilled className="delete-icon" type="button" style={{ fontSize: "1.5rem", color:"red", marginTop: "5%", marginRight: "5%"}} onClick={() => toggle("delete", data)}/>
            </section>
          )
        }))}
      </div>  
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log("MSTP EXERCISE LIST", state)
  return {
    userId: state.user_id,
    workout: state.workout,
    error: state.error_message.data,
    exercises: state.exercises,
    fetchMessage: state.fetchMessage
  }
}


export default connect(mapStateToProps, { fetchExercises, addExercise, editExercise, deleteExercise, singleWorkout })(ExerciseList)
