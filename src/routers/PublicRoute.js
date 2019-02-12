import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'


export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) =>
  (
    <Route {...rest} component={(props) => (
      !isAuthenticated ? (
        <Component {...props} />
      ) :
        (
          <Redirect to={'/dashboard'} />
        )
    )} />
  )

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  component: PropTypes.Component
}

const MapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
})

export default connect(MapStateToProps)(PublicRoute)