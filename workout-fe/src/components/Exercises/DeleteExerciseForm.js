import React from 'react'

export default function DeleteExerciseForm({ removeExercise, setIsDeleteOpen, data }) {
  console.log(data)
  return (
    <div className="forms align">
      <h2>Are you sure you want to delete {data.exercise_name}</h2>
      <button onClick={removeExercise}>YES</button>
      <button onClick={() => setIsDeleteOpen(false)}>Cancel</button>
    </div>
  )
}
