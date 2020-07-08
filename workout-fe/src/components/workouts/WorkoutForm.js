import React from 'react';
import { connect } from 'react-redux';

function WorkoutForm(props) {

  return (
    <form onSubmit="">
      <input type="text" name="workout" placeholder="Workout Name"/>
      <input type="date" name="date" placeholder="Date"/>
      <button type="submit">Add Workout</button>
    </form>
  )
}


const mapStateToProps = (state) => {
  console.log("MSTP WORKOUTS", state)
  return {
    userId: state.user_id,
    isFetching: state.isFetching,
  }
}



export default connect(mapStateToProps, {})(WorkoutForm)