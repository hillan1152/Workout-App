import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { PlusCircleOutlined } from '@ant-design/icons';
import { fetchExercises, editExercise, deleteExercise, singleWorkout, open } from '../../actions'
import { capital } from '../../utils/helpers'
import moment from 'moment';
import AddExerciseForm from './AddExerciseForm';
import DeleteExerciseForm from './DeleteExerciseForm';
import EditExerciseForm from './EditExerciseForm';
import { addStyle } from '../../utils/helpers'

import ExerciseCard from './ExerciseCard';

export const ExerciseList =  (props) => {
  // PASSES ALL EXERCISE DATA BETWEEN FORMS
  const [ exerciseData, setExerciseData ] = useState();
  // OPEN ADD FORM 
  const [ isAddFormOpen, setIsAddFormOpen ] = useState(false);
  // OPEN DELETE FORM
  const [ isDeleteOpen, setIsDeleteOpen ] = useState(false);
  // OPEN EDIT FORM 
  const [ isEditOpen, setIsEditOpen ] = useState(false);

  // EXERCISE DATA --- USED FOR MAPPING EXERCISES
  const exData = (((props.exercises || {}).data || {}).exercises || []);
  const exerciseList = [...exData];


  useEffect(() => {
    let woID = parseInt(props.workoutId);
    props.fetchExercises(woID)
  }, [props.changed]);


  const removeExercise = e => {
    props.deleteExercise(exerciseData.exercise_id, props.workoutId);
    setIsDeleteOpen(false);
  };

  const closeForms = () => {
    setIsDeleteOpen(false);
    setIsAddFormOpen(false);
    setIsEditOpen(false);
  };
  
  return (
    <div className="exercise-list-container" >
      {isAddFormOpen && <AddExerciseForm closeForms={closeForms} />}
      
      {isDeleteOpen && <DeleteExerciseForm closeForms={closeForms} removeExercise={removeExercise}  data={exerciseData} setIsDeleteOpen={setIsDeleteOpen}/>}
      
      {isEditOpen && <EditExerciseForm closeForms={closeForms} exData={exerciseData} workoutId={props.workout.id}/>}
      
      <h2 className={`${isAddFormOpen || isDeleteOpen || isEditOpen || props.opened ? `active` : ''}`} onClick={() => props.open()}>{capital(`${props.workout.name}`)}</h2>

      <PlusCircleOutlined style={{...addStyle}} onClick={() => setIsAddFormOpen(true)}/>
      
      <div className={`exercise-list ${isAddFormOpen || isDeleteOpen || isEditOpen || props.opened ? `active` : ''}`}>
        <h4 className={isAddFormOpen ? `active` : ''}>{moment(props.workout.date).format("dddd, MMMM Do")}</h4>
        {exerciseList.map((data, index) => {
          return (
            <ExerciseCard 
              index={index}
              key={data.exercise_id} 
              data={data} 
              opened={props.opened} 
              setExerciseData={setExerciseData} 
              setIsEditOpen={setIsEditOpen}
              setIsAddFormOpen={setIsAddFormOpen}
              setIsDeleteOpen={setIsDeleteOpen}
              isDeleteOpen={isDeleteOpen}
              isAddFormOpen={isAddFormOpen}
              closeForms={closeForms}
            />
          )
        })}
      </div>  
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log("MSTP EXERCISE LIST", state.toggleTracker)
  return {
    workout: state.workout,
    exercises: state.exercises,
    fetchMessage: state.fetchMessage,
    changed: state.changed,
    opened: state.opened,
  }
}


export default connect(mapStateToProps, { fetchExercises, editExercise, deleteExercise, singleWorkout, open })(ExerciseList)
