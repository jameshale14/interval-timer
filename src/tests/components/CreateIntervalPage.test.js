import React from 'react'
import { fireEvent, cleanup, render } from 'react-testing-library'
import { CreateIntervalPage } from '../../components/CreateIntervalPage'
import { intervals } from '../fixtures/intervals'

let startCreateInterval, history

beforeEach(() => {
  startCreateInterval = jest.fn()
  history = { push: jest.fn() }
  })

afterEach(cleanup)

test('should render CreateIntervalPage correctly', () => {
  const { container } = render(<CreateIntervalPage startCreateInterval={startCreateInterval} history={history} />)
  expect(container).toMatchSnapshot()
})

test('should handle onSubmit', () => {
  const { container, getByText, getByLabelText } = render(<CreateIntervalPage startCreateInterval={startCreateInterval} history={history} />)
  const submitButton = getByText('Save')
  const title = getByLabelText('Name')
  fireEvent.click(submitButton, {
    preventDefault: () => { }
  })

  fireEvent.change(title, {
    target: { value: intervals[1].name }
  })

  const stepType = getByLabelText('Step Type')
  const stepName = getByLabelText('Step Name')
  const stepDuration = getByLabelText('Step Duration')
  const addStepButton = getByText('Add Step')

  intervals[1].steps.forEach((step) => {
    fireEvent.change(
      stepType,
      { target: { value: step.type } }
    )
    fireEvent.change(
      stepName,
      { target: { value: step.name } }
    )
    fireEvent.change(
      stepDuration,
      { target: { value: step.duration } }
    )
    fireEvent.click(addStepButton, {
      preventDefault: () => { }
    })
  })

  fireEvent.click(submitButton, {
    preventDefault: () => { }
  })

  // wrapper.find('IntervalForm').prop('onSubmit')(intervals[1])
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(startCreateInterval).toHaveBeenLastCalledWith({ name: intervals[1].name, steps: intervals[1].steps })
})