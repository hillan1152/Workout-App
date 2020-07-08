import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

// GET ALL EXERCISES W/ WORKOUT NAME
// DELETE A WORKOUT
// ADD AN EXERCISE
// EDIT AN EXERCISE


export const SingleWorkout = (props) => {
  let workoutId = props.match.params.id;

  return (
    <div>
      
    </div>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, )(SingleWorkout)

