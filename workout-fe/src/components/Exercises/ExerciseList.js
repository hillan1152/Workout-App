import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { PlusCircleOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import { fetchExercises, editExercise, deleteExercise, singleWorkout } from '../../actions'
import { capital } from '../../utils/helpers'
import moment from 'moment';
import AddExerciseForm from './AddExerciseForm';
import DeleteExerciseForm from './DeleteExerciseForm';
import EditExerciseForm from './EditExerciseForm';
import { addStyle, editStyle, nameStyle, deleteStyle } from '../../utils/helpers'

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

  const toggle = (name, data) => {
    setExerciseData(data)
    if(name === 'edit'){
      setIsEditOpen(true)
      setIsAddFormOpen(false);
      setIsDeleteOpen(false);
    } else if(name === 'delete'){
      setIsDeleteOpen(true)
      setIsAddFormOpen(false);
      setIsEditOpen(false);
    } 
  }


//   const playData = [];
  
//   {((exData || []).forEach((exercise) => {
//     playData.push(
//       <div 
//         key={exercise.exercise_id}
//         onDragStart={(e) => onDragStart(e, exercise.exercise)}
//         draggable
//         className="draggable"
//         style={{ backgroundColor: 'orange', margin: '2rem', padding: '2rem'}}
//       >
//         {exercise.exercise}
//       </div>
//     )
//   }))}

// 	const onDragStart = (event, ex_id) => {
//     console.log('dragstart on div: ', ex_id);
//     event.dataTransfer.setData("ex_id", ex_id);
//   }
//   const onDragOver = (event) => {
//       event.preventDefault();
//   }
//   const onDrop = (event, cat) => {
//     let taskName = event.dataTransfer.getData("ex_id");

//     let exercises = exData.filter((ex) => {
//         if (ex.exercise == taskName) {
//             ex.type = cat;
//         }
//         return ex;
//     });

//     setExerciseData({
//         ...this.state,
//         exercises
//     });
// }
  return (
    <div className="exercise-list-container" >
      {isAddFormOpen && <AddExerciseForm closeForms={closeForms} />}
      
      {isDeleteOpen && <DeleteExerciseForm closeForms={closeForms} removeExercise={removeExercise}  data={exerciseData} setIsDeleteOpen={setIsDeleteOpen}/>}
      
      {isEditOpen && <EditExerciseForm closeForms={closeForms} exData={exerciseData} workoutId={props.workout.id}/>}

      <PlusCircleOutlined style={{...addStyle}} onClick={() => setIsAddFormOpen(true)}/>

      {/* <div className="drag-container">
	      <h2 className="head">To Do List Drag & Drop</h2>
		    <div className="inProgress"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, 'inProgress')}
        >
          <span className="group-header">In Progress</span>
          {playData}
	      </div>      
	    </div> */}


      
      <div className={`exercise-list-container ${isAddFormOpen || isDeleteOpen || isEditOpen ? `active` : ''}`}>
        <h4 className={isAddFormOpen ? `active` : ''}>{moment(props.workout.date).format("dddd, MMMM Do")}</h4>
        {((exData || []).map(data => {
          return (
            <section className={`exercise ${isAddFormOpen || isDeleteOpen || isEditOpen ? `active` : ''}`} key={data.exercise_id} onClick={() => setIsAddFormOpen(false)}>
              <EditFilled className="edit-icon" style={{...editStyle}} onClick={() => toggle("edit", data)}/>
              <section onClick={() => closeForms()}>
                <h3>{capital(`${data.exercise}`)}</h3>
                <p>{data.weight === 0 ? '' : `${data.weight}lbs `}{`${data.sets} sets`}x{`${data.reps} reps`}</p>
              </section>             
              <DeleteFilled className="delete-icon" type="button" style={{...deleteStyle}} onClick={() => toggle("delete", data)}/>
            </section>
          )
        }))}
      </div>  
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log("MSTP EXERCISE LIST", state.changed)
  return {
    userId: state.user_id,
    workout: state.workout,
    error: state.error_message.data,
    exercises: state.exercises,
    fetchMessage: state.fetchMessage,
    changed: state.changed
  }
}


export default connect(mapStateToProps, { fetchExercises, editExercise, deleteExercise, singleWorkout })(ExerciseList)
