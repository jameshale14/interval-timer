import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

export const LoginPage = ({ startLogin }) => (
  <div className='box-layout'>
    <div className='box-layout__box'>
      <h1 className='box-layout__title'>Boileplate</h1>
      <p>Tag line for app.</p>
      <button className='button' onClick={startLogin}>Login with Google</button>
    </div>

  </div>
)

LoginPage.propTypes = {
  startLogin: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)