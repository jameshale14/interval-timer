/*eslint-env browser*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class StartIntervalPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStepIndex: 0,
      currentStepName: undefined,
      currentTimeRemaining: undefined,
      isRunning: false
    }
    this.interval = undefined
  }

  initialise = () => {
    const currentStepIndex = this.state.currentStepIndex
    this.setState(() => ({
      currentStepName: this.props.interval.steps[currentStepIndex].name,
      currentTimeRemaining: this.props.interval.steps[currentStepIndex].duration
    }))
  }

  runTimer = () => {
    if (!this.state.isRunning) {
      return
    }

    if (this.state.currentTimeRemaining == 0) {
      if (this.state.currentStepIndex < (this.props.interval.steps.length - 1)) {
        this.setState((prevState) => ({
          currentStepIndex: (prevState.currentStepIndex + 1)
        }))
        this.initialise()
      } else {
        window.clearInterval(this.interval)
        this.setState(() => ({ isRunning: false }))
      }

    } else {
      this.setState((prevState) => ({
        currentTimeRemaining: (prevState.currentTimeRemaining - 1)
      }))
    }
  }

  handleStart = (e) => {
    e.preventDefault()

    if (this.state.currentTimeRemaining == undefined) {
      this.initialise()
    }
    this.setState(({ isRunning: true }))
    this.interval = setInterval(this.runTimer, 1000)

  }

  handleStop = (e) => {
    e.preventDefault()

    window.clearInterval(this.interval)
    this.setState(() => ({ isRunning: false }))
  }

  handleRestartStep = (e) => {
    e.preventDefault()

    this.initialise()
    this.setState(({ isRunning: true }))
    this.interval = setInterval(this.runTimer, 1000)

  }

  handleRestartWholeInterval = (e) => {
    e.preventDefault()

    this.setState(() => ({ currentStepIndex: 0 }))
    this.initialise()
    this.setState(({ isRunning: true }))
    this.interval = setInterval(this.runTimer, 1000)

  }

  render() {
    return (
      <div>
        <h3>{this.props.interval.name}</h3>
        <h1>{this.state.currentStepName}</h1>
        <h1>{this.state.currentTimeRemaining}</h1>
        <button onClick={this.handleStart}>Start</button>
        <button onClick={this.handleStop}>Stop</button>
        {!this.state.isRunning && this.state.currentStepName != undefined &&
          <>
            <button onClick={this.handleRestartStep}>Restart Step</button>
            <button onClick={this.handleRestartWholeInterval}>Restart Interval</button>
          </>
        }
      </div>
    )
  }

}

StartIntervalPage.propTypes = {
  interval: PropTypes.object
}

const mapStateToProps = (state, props) => ({
  interval: state.intervals.find((interval) => interval.id === props.match.params.id)
})

export default connect(mapStateToProps)(StartIntervalPage)