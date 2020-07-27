import React from 'react'
import { connect } from 'react-redux'

export const Errors = ({ error_message}) => {
  return (
    <div>
      {error_message.data.message}
    </div>
  )
}

export default connect(null, {})(Errors)

