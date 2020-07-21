import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchExercises } from '../../actions'
export const ExerciseList =  (props) => {
  const exData = (((props.exercises || {}).data || {}).exercises || []);
  
  console.log((exData[0] || []).region)
  // if(exData.length == 0) return alert(`${props.exercises.message}`)
  return (
    <div>
      <h2>{(exData[0] || []).region}</h2>
      {((exData || []).map(data => {
        return (
          <div key={data.exercise_id}>
            <section>
              <h3>{data.exercise_name}</h3>
              <p>{data.weight == 0 ? '' : `${data.weight}lbs :`} {data.sets} sets {data.reps} reps</p>
            </section>
          </div>
        )
      }))}
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log("MSTP EXERCISE LIST", state.info.data.filter((type) => type === (typeof Array)))
  return {
    info: state.info,
    workout: state.workout,
    error: state.error,
    exercises: state.exercises
  }
}


export default connect(mapStateToProps, { fetchExercises })(ExerciseList)
