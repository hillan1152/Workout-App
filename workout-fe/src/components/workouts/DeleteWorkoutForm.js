import React from 'react'

export default function DeleteWorkoutForm(props) {
  // Confirms Removal and Sends Back to Workout Page
  const removeWorkout = (e) => {
    e.preventDefault();
    props.deleteWorkout(props.singleData.id);
    props.setOpenDelete(false);
  };
  return (
    <section className="confirm-delete">
      <h3>Are you sure you want to delete {props.singleData.name}?</h3>
      <button onClick={removeWorkout}>Confirm Delete</button>
      <button onClick={() => props.setOpenDelete(false)}>Cancel</button>
    </section> 
  )
}