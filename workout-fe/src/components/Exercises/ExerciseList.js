import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchExercises } from '../../actions'
export const ExerciseList = ({ workoutId, fetchExercises }) => {
  let id = parseInt(workoutId);

  // useEffect(() => {
  //   fetchExercises(id)
  // }, [])
  return (
    <div>
      EXERCISE LIST
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    exercises: state.exercises
  }
}


export default connect(mapStateToProps, { fetchExercises })(ExerciseList)
