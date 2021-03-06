import React from 'react'
import { connect } from 'react-redux'

import { logout } from '../../actions/index';

export const Logout = ({ logout}) => {
  return (
      <p className="logout" onClick={() => logout()}>Logout</p>
  )
}

export default connect(null, { logout })(Logout)
