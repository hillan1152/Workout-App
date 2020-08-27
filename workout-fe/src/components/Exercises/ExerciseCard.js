import React, { useState, useEffect } from 'react'
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { capital } from '../../utils/helpers'

export default function SingleExercise(props) {
  const [ isExpanded, setIsExpanded ] = useState(false);
  const [ isChecked, setIsChecked ] = useState(false);

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
  const checked = e => {
    if(e.target.checked){
      setIsChecked(true)
      setIsExpanded(false)
    } else {
      setIsChecked(false)
    }
  }
  const toggleExercises = (index) => {
      setIsExpanded(!isExpanded)
      props.setIsDeleteOpen(false)
      props.setIsAddFormOpen(false);
      props.setIsEditOpen(false);
  } 
  return (
    <section className={`exercise ${props.isAddFormOpen || props.isDeleteOpen || props.isEditOpen || props.opened ? `active` : ''}`} >
      <section className={`upper-exercise ${isExpanded ? 'expansion' : null} ${isChecked ? 'faded' : ''}`} >
        <div className={`${isExpanded ? 'expansion' : null}`} onClick={() => toggleExercises(props.index)}><h4>{props.index + 1}</h4></div>
        
        <div className={`mid ${isExpanded ? 'expansion' : null}`} onClick={() => toggleExercises(props.index)} ><h3>{capital(`${props.data.exercise}`)}</h3></div>
        
        <div className={`${isExpanded ? 'expansion' : null}`}><input onClick={(e) => checked(e)}type="checkbox"/></div>
      </section>
      {isExpanded && (
      <div className="expanded">
        <div className="expanded-left">
          <p className="exercise-weight">{props.data.weight === 0 ? '' : `Weight: ${props.data.weight}lbs `}</p>
          <p>{`Sets: ${props.data.sets} `}{`Reps: ${props.data.reps}  `}</p>
        </div>
        <div className="expanded-right">
          <EditFilled className="edit-icon" style={{ color: 'yellow', marginBottom: '1.2rem'}} onClick={() => toggle("edit", props.data)}/>
          <DeleteFilled className="delete-icon" style={{ color: 'darkGreen', backgroundColor: 'none'}} onClick={() => toggle("delete", props.data)}/>
        </div>
      </div>)}
    </section>
  )
}
