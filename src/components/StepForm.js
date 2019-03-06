import React from 'react'
import PropTypes from 'prop-types'

export default class StepForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      error: undefined,
      isRestType: false,
      type: 'Activity',
      name: '',
      duration: 0
    }
  }

  onTypeChange = (e) => {
    const type = e.target.value
    const isRestType = type == 'Rest' ? true : false
    const name = isRestType ? 'Rest' : ''
    this.setState(() => ({ type, isRestType, name }))
  }

  onNameChange = (e) => {
    const name = e.target.value
    this.setState(() => ({ name }))
  }

  onDurationChange = (e) => {
    const duration = e.target.value
    this.setState(() => ({ duration }))
  }

  handleAddStep = (e) => {
    e.preventDefault()
    if (this.state.type == '' || this.state.name == '' || this.state.duration == 0) {
      this.setState(() => ({ error: 'Please fill in all fields' }))
    } else {
      this.setState(() => ({ error: undefined }))
      const newStep = {
        name: this.state.name,
        type: this.state.type,
        duration: this.state.duration
      }
      this.props.onSubmit(newStep)
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddStep}>
          <label htmlFor='stepType' >Step Type</label>
          <select
            id='stepType'
            value={this.state.type}
            onChange={this.onTypeChange}
            onBlur={this.onTypeChange}
          >
            <option value='Activity'>Activity</option>
            <option value='Rest'>Rest</option>
          </select>

          <label htmlFor='stepName'>Step Name</label>
          <input
            id='stepName'
            type='text'
            placeholder='Step name'
            value={this.state.name}
            onChange={this.onNameChange}
            disabled={this.state.isRestType}
          />

          <label htmlFor='stepDuration'>Step Duration</label>
          <input
            id='stepDuration'
            type='number'
            placeholder='Duration (seconds)'
            step='1'
            value={this.state.duration}
            onChange={this.onDurationChange}
          />
          <button onClick={this.handleAddStep}>Add Step</button>
        </form>
      </div>
    )
  }
}

StepForm.propTypes = {
  onSubmit: PropTypes.func
}