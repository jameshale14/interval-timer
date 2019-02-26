import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import IntervalForm from './IntervalForm'
import { startUpdateInterval, startDeleteInterval } from '../actions/intervals'

export class EditIntervalPage extends React.Component {

  onSubmit = (interval) => {
    this.props.startUpdateInterval(this.props.interval.id, interval)
    this.props.history.push('/')
  }

  handleDeleteInterval = () => {
    this.props.startDeleteInterval(this.props.interval.id)
    this.props.history.push('/')
  }

  render() {
    return (
      <>
        <h3>Edit Interval</h3>
        <div>
          <IntervalForm onSubmit={this.onSubmit} interval={this.props.interval} />
        </div>
        <button onClick={this.handleDeleteInterval}>Remove</button>
      </>
    )
  }
}

EditIntervalPage.propTypes = {
  history: PropTypes.object,
  interval: PropTypes.object,
  startDeleteInterval: PropTypes.func,
  startUpdateInterval: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  interval: state.intervals.find((interval) => interval.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
  startDeleteInterval: (id) => dispatch(startDeleteInterval(id)),
  startUpdateInterval: (id, interval) => dispatch(startUpdateInterval(id, interval))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditIntervalPage)