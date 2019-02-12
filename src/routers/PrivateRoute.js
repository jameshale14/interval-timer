import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'


export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) =>
  (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) :
        (
          <Redirect to={'/'} />
        )
    )} />
  )

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  component: PropTypes.Component
}

const MapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
})

export default connect(MapStateToProps)(PrivateRoute)