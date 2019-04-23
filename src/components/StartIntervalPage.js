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

  componentDidMount() {
    document.title = 'Start Interval | Interval Timer'
  }

  componentDidUpdate() {
    document.title = 'Start Interval | Interval Timer'
  }

  initialise = (stepIndex) => {
    // const currentStepIndex = this.state.currentStepIndex
    this.setState(() => ({
      currentStepName: this.props.interval.steps[stepIndex].name,
      currentTimeRemaining: this.props.interval.steps[stepIndex].duration
    }))
  }

  runTimer = () => {
    if (!this.state.isRunning) {
      return
    }

    const currTime = this.state.currentTimeRemaining - 1
    this.playSound(currTime)

    if (this.state.currentTimeRemaining == 1) {
      if (this.state.currentStepIndex < (this.props.interval.steps.length - 1)) {
        this.setState((prevState) => ({
          currentStepIndex: (prevState.currentStepIndex + 1)
        }))
        this.initialise(this.state.currentStepIndex)
      } else {
        window.clearInterval(this.interval)
        this.setState(() => ({ isRunning: false }))
      }

    } else {
      // const currTime = this.state.currentTimeRemaining

      this.setState((prevState) => ({
        currentTimeRemaining: (prevState.currentTimeRemaining - 1)
      }))

      // this.playSound(currTime)

    }
  }

  playSound = (timeRemaining) => {
    if (timeRemaining > 3) {
      return
    }

    if (timeRemaining == 0) {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const context = new AudioContext()
      const g = context.createGain()
      const o = context.createOscillator()
      o.type = 'sine'
      o.connect(g)
      o.frequency.value = 659.26
      g.connect(context.destination)
      o.start(0)
      g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 2.5)

    } else {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const context = new AudioContext()
      const g = context.createGain()
      const o = context.createOscillator()
      o.type = 'sine'
      o.connect(g)
      o.frequency.value = 440.0
      g.connect(context.destination)
      o.start(0)
      g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1)

    }
  }

  handleStart = (e) => {
    e.preventDefault()
    if (this.state.isRunning) {
      return
    }
    if (this.state.currentTimeRemaining == undefined) {
      this.initialise(0)
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

    this.initialise(this.state.currentStepIndex)
    this.setState(({ isRunning: true }))
    this.interval = setInterval(this.runTimer, 1000)

  }

  handleRestartWholeInterval = (e) => {
    e.preventDefault()

    this.setState(() => ({ currentStepIndex: 0 }))
    this.initialise(0)
    this.setState(({ isRunning: true }))
    this.interval = setInterval(this.runTimer, 1000)

  }

  render() {
    return (
      <div>
        <h3 data-testid='interval-name'>{this.props.interval.name}</h3>
        <h1 data-testid='step-name'>{this.state.currentStepName}</h1>
        <h1 data-testid='time-remaining'>{this.state.currentTimeRemaining}</h1>
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