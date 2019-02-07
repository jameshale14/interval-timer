import React from 'react'
import { connect } from 'react-redux'
import IntervalForm from './IntervalForm'

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

const mapDispatchToProps = (dispatch) => ({
  startCreateInterval: (interval) => dispatch(startCreateInterval(interval))
})

export default connect(undefined, mapDispatchToProps)(CreateIntervalPage)