import React from 'react'
import PropTypes from 'prop-types'

export default class IntervalForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      stepError: undefined,
      saveError: undefined,
      name: props.interval ? props.interval.name : '',
      steps: props.interval ? props.interval.steps : [],
      newStep: {
        type: 'Activity',
        name: '',
        duration: ''
      }
    }
  }

  handleAddStep = (e) => {
    e.preventDefault()
    if (this.state.newStep.type == '' || this.state.newStep.name == '' || this.state.newStep.duration == 0) {
      this.setState(() => ({ stepError: 'Please fill in all fields' }))
    } else {
      this.setState((prevState) => {
        const newStep = { ...this.state.newStep }
        return {
          steps: [...prevState.steps, newStep],
          stepError: undefined
        }
      })
      // this.setState(() => ({  }))
    }
  }

  onTypeChange = (e) => {
    const type = e.target.value
    this.setState((prevState) => {
      const newStep = prevState.newStep
      newStep.type = type
      return { newStep }
    })
  }

  onNameChange = (e) => {
    const name = e.target.value
    this.setState((prevState) => {
      const newStep = prevState.newStep
      newStep.name = name
      return { newStep }
    })
  }

  onIntervalNameChange = (e) => {
    const name = e.target.value
    this.setState(() => ({ name }))
  }

  onDurationChange = (e) => {
    const duration = e.target.value
    this.setState((prevState) => {
      const newStep = prevState.newStep
      newStep.duration = duration
      return { newStep }
    })
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
      const steps = prevState.steps.filter((step, index) => {
        return index != stepIndex
      })

      return ({
        steps
      })

    })
  }

  render() {
    return (
      <div>
        <button id='saveInterval' onClick={this.handleOnSave}>Save</button>
        {this.state.saveError && <p>{this.state.saveError}</p>}
        <input
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
        <div>
          {this.state.stepError && <p>{this.state.stepError}</p>}
          <form onSubmit={this.handleAddStep}>
            <select
              value={this.state.newStep.type}
              onChange={this.onTypeChange}
              onBlur={this.onTypeChange}
            >
              <option value='Activity'>Activity</option>
              <option value='Rest'>Rest</option>
            </select>

            <input
              type='text'
              placeholder='Step name'
              value={this.state.newStep.name}
              onChange={this.onNameChange}
            />
            <input
              type='number'
              placeholder='Duration (seconds)'
              step='1'
              value={this.state.newStep.duration}
              onChange={this.onDurationChange}
            />
            <button onClick={this.handleAddStep}>Add Step</button>
          </form>
        </div>
      </div>
    )
  }
}

IntervalForm.propTypes = {
  interval: PropTypes.object,
  onSubmit: PropTypes.func
}
