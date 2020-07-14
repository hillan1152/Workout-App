import React from 'react'
import { connect } from 'react-redux'

import { logout } from '../../actions/index';

export const Logout = ({ logout}) => {
  return (
    <>
      <button onClick={() => logout()}>Logout</button>
    </>
  )
}

const mapStateToProps = (state) => ({
  
})

export default connect(null, { logout })(Logout)
