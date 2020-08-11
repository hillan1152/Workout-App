import React from 'react'
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { capital } from '../../utils/helpers'
import { editStyle, deleteStyle } from '../../utils/helpers'

export default function SingleExercise(props) {
  
  const toggle = (name, data) => {
    props.setExerciseData(data)
    if(name === 'edit'){
      props.setIsEditOpen(true)
      props.setIsAddFormOpen(false);
      props.setIsDeleteOpen(false);
    } else if(name === 'delete'){
      props.setIsDeleteOpen(true)
      props.setIsAddFormOpen(false);
      props.setIsEditOpen(false);
    } 
  }

  return (
    // <section className={`exercise ${isAddFormOpen || isDeleteOpen || isEditOpen || props.opened ? `active` : ''}`} key={data.exercise_id} onClick={() => setIsAddFormOpen(false)}>
    <section className={`exercise ${props.isAddFormOpen || props.isDeleteOpen || props.isEditOpen || props.opened ? `active` : ''}`}  onClick={() => props.setIsAddFormOpen(false)}>
      <EditFilled className="edit-icon" style={{...editStyle}} onClick={() => toggle("edit", props.data)}/>
      <section onClick={() => props.closeForms()}>
        <h3>{capital(`${props.data.exercise}`)}</h3>
        <p>{props.data.weight === 0 ? '' : `${props.data.weight}lbs `}{`${props.data.sets} sets`} x {`${props.data.reps} reps`}</p>
      </section>             
      <DeleteFilled className="delete-icon" type="button" style={{...deleteStyle}} onClick={() => toggle("delete", props.data)}/>
    </section>
  )
}
