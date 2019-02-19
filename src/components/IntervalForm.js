import React from 'react'
import PropTypes from 'prop-types'

export default class IntervalForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      description: props.interval ? props.interval.expense : '',
      steps: props.interval ? props.interval.steps : [],
      newStep: {
        type: '',
        name: '',
        duration: ''
      }
    }
  }

  handleAddStep = (e) => {
    e.preventDefault()
    this.setState((prevState) => ({ steps: [...prevState.steps, prevState.newStep] }))
  }

  onTypeChange = (e) => {
    const type = e.target.value
    this.setState((prevState) => {
      const newStep = prevState.newStep
      newStep.type = type
      return { newStep }
    }
    )
  }

  onNameChange = (e) => {
    const name = e.target.value
    this.setState((prevState) => {
      const newStep = prevState.newStep
      newStep.name = name
      return { newStep }
    }
    )
  }

  onDurationChange = (e) => {
    const duration = e.target.value
    this.setState((prevState) => {
      const newStep = prevState.newStep
      newStep.duration = duration
      return { newStep }
    }
    )
  }

  render() {
    return (
      <div>
        IntervalForm
        <form onSubmit={this.onSubmit}>
          <input
            type='text'
            placeholder='Description'
          />
          {
            this.state.steps.map((step, stepIndex) => {
              return (
                <div key={stepIndex} >
                  <p>Type: {step.type}</p>
                  <p>Name: {step.name}</p>
                  <p>Duration: {step.duration}</p>
                </div>
              )

            })
          }
          <div>
            <input
              type='text'
              placeholder='Type'
              value={this.state.newStep.type}
              onChange={this.onTypeChange}
            />
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
          </div>
        </form>
      </div>
    )
  }

}

IntervalForm.propTypes = {
  interval: PropTypes.object
}
