import React from 'react'
import PropTypes from 'prop-types'
import StepForm from './StepForm'

export default class IntervalForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      saveError: undefined,
      name: props.interval ? props.interval.name : '',
      steps: props.interval ? props.interval.steps : []
    }
  }

  handleAddStep = (step) => {
    this.setState((prevState) => {
      const newStep = { ...step }
      return {
        steps: [...prevState.steps, newStep]
      }
    })
  }

  onIntervalNameChange = (e) => {
    const name = e.target.value
    this.setState(() => ({ name }))
  }

  handleOnSave = (e) => {
    e.preventDefault()

    if (!this.state.name || this.state.steps.length === 0) {
      this.setState(() => ({ saveError: 'Please provide a routine name and interval steps.' }))
    } else {
      this.setState(() => ({ saveError: undefined }))

      const interval = {
        name: this.state.name,
        steps: this.state.steps
      }

      this.props.onSubmit(interval)
    }

  }

  handleRemoveStep = (e) => {
    e.preventDefault()
    const stepIndex = parseInt(e.currentTarget.value)

    this.setState((prevState) => {
      const steps = prevState.steps.filter((undefined, index) => index != stepIndex)

      return ({ steps })

    })
  }

  render() {
    return (
      <div>
        <button id='saveInterval' onClick={this.handleOnSave}>Save</button>
        {this.state.saveError && <p>{this.state.saveError}</p>}
        <label htmlFor='intervalName'>Name</label>
        <input
          id='intervalName'
          type='text'
          placeholder='name'
          value={this.state.name}
          onChange={this.onIntervalNameChange}
        />
        {
          this.state.steps.map((step, stepIndex) => {
            return (
              <div key={stepIndex} >
                <p>Type: {step.type}</p>
                <p>Name: {step.name}</p>
                <p>Duration: {step.duration}</p>
                <button onClick={this.handleRemoveStep} value={stepIndex}>Remove</button>
              </div>
            )
          })
        }

        <StepForm onSubmit={this.handleAddStep} />

      </div >
    )
  }
}

IntervalForm.propTypes = {
  interval: PropTypes.object,
  onSubmit: PropTypes.func
}
