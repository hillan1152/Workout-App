import React from 'react'

export default function EditExerciseForm({ setInputExercise, inputExercise, closeForms, editSingleExercise, exData }) {
  const handleChange = e => {
    setInputExercise({ ...inputExercise, [e.target.name]: e.target.value ? e.target.value: '' });
  };
  return (
    <div className="forms align">
      <form onSubmit={editSingleExercise} >
        <h2>Edit An Exercise</h2>
        <input onChange={handleChange} placeholder={`${(exData || []).exercise}`} name="exercise"/>
        <input onChange={handleChange} placeholder={`${(exData || []).region}`} name="region"/>
        <input onChange={handleChange} type="number" placeholder={`Weight: ${(exData || []).weight}`} name="weight"/>
        <input onChange={handleChange} type="number" placeholder={`Sets: ${(exData || []).sets}`} name="sets"/>
        <input onChange={handleChange} type="number" placeholder={`Reps: ${(exData || []).reps}`} name="reps"/>
        <button type="submit">Edit</button>
      </form>
      <button onClick={() => closeForms()}>Cancel</button>
    </div>
  )
}
