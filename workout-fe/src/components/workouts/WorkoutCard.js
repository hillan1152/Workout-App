import React from 'react'
import { capital } from '../../utils/helpers';
import { deleteStyle } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import { DeleteFilled } from '@ant-design/icons';
import moment from 'moment';

export default function WorkoutCard({ workout, setSingleData, setOpenDelete }) {
  // OPENS DELETE MODAL & ADDS DATA FOR MANIPULATION
  const deleteModal = (data) => {
    setOpenDelete(true);
    setSingleData(data)
  }
  return (
    <div className="individual_workout" key={workout.id}>
      <section>
        <DeleteFilled className="delete-icon" style={{...deleteStyle}} onClick={() => deleteModal(workout)}/>
        <div>
          <Link className="link" to={`/workouts/${workout.id}/${workout.name}`} >
            <h3>{ capital(workout.name) }</h3>
            <p>{ moment(workout.date).format("dddd, MMMM Do") }</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
