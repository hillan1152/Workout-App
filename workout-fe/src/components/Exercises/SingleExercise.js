import React, { useState } from 'react'
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { capital } from '../../utils/helpers'

export default function SingleExercise(props) {
  const[ isExpanded, setIsExpanded ] = useState(false);
  
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
    } else if(name === 'expand'){
      props.setIsDeleteOpen(false)
      props.setIsAddFormOpen(false);
      props.setIsEditOpen(false);
      setIsExpanded(!isExpanded)
    } 
  }
  return (
    <section className={`exercise ${props.isAddFormOpen || props.isDeleteOpen || props.isEditOpen || props.opened ? `active` : ''}`} >
      <section className={`upper-exercise ${isExpanded ? 'expansion' : null}`}>
        <div className={`${isExpanded ? 'expansion' : null}`} onClick={() => toggle("expand", props.data)}><h4>{props.index}</h4></div>
        
        <div className={`mid ${isExpanded ? 'expansion' : null}`} onClick={() => toggle("expand", props.data)} ><h3>{capital(`${props.data.exercise}`)}</h3></div>
        
        <div className={`${isExpanded ? 'expansion' : null}`}><input type="checkbox"/></div>
      </section>
      {isExpanded && (
      <div className="expanded">
        <div className="expanded-left">
          <p className="exercise-weight">{props.data.weight === 0 ? '' : `Weight: ${props.data.weight}lbs `}</p>
          <p>{`Reps: ${props.data.reps}  `}  {`Sets: ${props.data.sets} `}</p>
        </div>
        <div className="expanded-right">
          <EditFilled className="edit-icon" style={{ color: 'yellow', marginBottom: '1.2rem'}} onClick={() => toggle("edit", props.data)}/>
          <DeleteFilled className="delete-icon" type="button" style={{color: 'darkGreen'}} onClick={() => toggle("delete", props.data)}/>
        </div>
      </div>)}
    </section>
  )
}
