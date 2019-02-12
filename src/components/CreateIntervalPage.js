import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import IntervalForm from './IntervalForm'
import startCreateInterval from '../actions/intervals'

export class CreateIntervalPage extends React.Component {
  onSubmit = (interval) => {
    this.props.startCreateInterval(interval)
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <IntervalForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}

CreateIntervalPage.propTypes = {
  startCreateInterval: PropTypes.func,
  history: PropTypes.object
}

const mapDispatchToProps = (dispatch) => ({
  startCreateInterval: (interval) => dispatch(startCreateInterval(interval))
})

export default connect(undefined, mapDispatchToProps)(CreateIntervalPage)