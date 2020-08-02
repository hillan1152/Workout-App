import React from 'react'

export default function DeleteExerciseForm({ removeExercise, setIsDeleteOpen, data }) {
  
  return (
    <div className="forms align">
      <h2>Are you sure you want to delete {data.exercise}</h2>
      <button onClick={removeExercise}>YES</button>
      <button onClick={() => setIsDeleteOpen(false)}>Cancel</button>
    </div>
  )
}
