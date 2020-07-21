import React from 'react'

export default function Modal({ info }) {
  console.log(info.name, info.date)
  return (
    <div>
      <h2>ARE YOU SURE YOU WANT TO UPDATE?</h2>
      <div>
        <p>{info.name}</p>
        <p>{info.date}</p>
      </div>
    </div>
  )
}

Modal.propTypes = {
  info: PropTypes.arrayOf(PropTypes.object).isRequired,
  
}