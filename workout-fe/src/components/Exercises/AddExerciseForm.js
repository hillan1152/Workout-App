import React from 'react';


export const AddExerciseForm = ({ submitExercise, setInputExercise, inputExercise, closeForms}) => {

  const handleChange = e => {
    setInputExercise({ ...inputExercise, [e.target.name]: e.target.value ? e.target.value: '' });
  };
  return (
    <div className="forms align">
      <form onSubmit={submitExercise}>
        <h2>Add An Exercise</h2>
        <input onChange={handleChange} placeholder="Exercise Name" name="exercise"/>
        <input onChange={handleChange} placeholder="Region" name="region"/>
        <input onChange={handleChange} placeholder="Weight" name="weight"/>
        <input onChange={handleChange} placeholder="Sets" name="sets"/>
        <input onChange={handleChange} placeholder="Reps" name="reps"/>
        <button type="submit">Add</button>
      </form>
      <button onClick={() => closeForms()}>Cancel</button>
    </div>
  )
}



export default AddExerciseForm;
