import React from 'react'
import { fireEvent, cleanup, render } from 'react-testing-library'
import IntervalForm from '../../components/IntervalForm'
import { intervals } from '../fixtures/intervals'

let onSubmit

beforeEach(() => {
  onSubmit = jest.fn()
})

afterEach(cleanup)

test('should render empty IntervalForm correctly', () => {
  const { container } = render(<IntervalForm onSubmit={onSubmit} />)
  expect(container).toMatchSnapshot()
})

test('should render pre-filled IntervalForm when sending interval data', () => {
  const { container } = render(<IntervalForm onSubmit={onSubmit} interval={intervals[1]} />)
  expect(container).toMatchSnapshot()
})

test('should add step to step list and render to screen when added from StepForm', () => {
  const { container, getByText, queryAllByText, getByLabelText } = render(<IntervalForm onSubmit={onSubmit} />)

  const newStep = {
    type: 'Activity',
    name: 'Squats',
    duration: 30
  }
  const stepType = getByLabelText('Step Type')
  const stepName = getByLabelText('Step Name')
  const stepDuration = getByLabelText('Step Duration')
  const addStepButton = getByText('Add Step')

  fireEvent.change(
    stepType,
    { target: { value: newStep.type } }
  )
  fireEvent.change(
    stepName,
    { target: { value: newStep.name } }
  )
  fireEvent.change(
    stepDuration,
    { target: { value: newStep.duration } }
  )

  fireEvent.click(addStepButton, {
    preventDefault: () => { }
  })

  const addedStep = queryAllByText(`Name: ${newStep.name}`)
  expect(addedStep.length).toEqual(1)
  expect(container).toMatchSnapshot()
})

test('should fire a save event when saved with valid submission', () => {
  const { getByText, getByLabelText } = render(<IntervalForm onSubmit={onSubmit} />)
  const submitButton = getByText('Save')
  const title = getByLabelText('Name')


  fireEvent.change(title, {
    target: { value: 'New Interval Routine' }
  })

  const stepType = getByLabelText('Step Type')
  const stepName = getByLabelText('Step Name')
  const stepDuration = getByLabelText('Step Duration')
  const addStepButton = getByText('Add Step')

  const newStep = {
    type: 'Activity',
    name: 'Push-ups',
    duration: "30"
  }
  fireEvent.change(
    stepType,
    { target: { value: newStep.type } }
  )
  fireEvent.change(
    stepName,
    { target: { value: newStep.name } }
  )
  fireEvent.change(
    stepDuration,
    { target: { value: newStep.duration } }
  )
  fireEvent.click(addStepButton, {
    preventDefault: () => { }
  })

  fireEvent.click(submitButton, {
    preventDefault: () => { }
  })
  expect(onSubmit).toHaveBeenLastCalledWith({
    name: 'New Interval Routine',
    steps: [
      {
        type: 'Activity',
        name: 'Push-ups',
        duration: "30"
      }
    ]
  })
})


test('should show an error when saving without enough data', () => {
  const { container, getByText, getAllByText } = render(<IntervalForm onSubmit={onSubmit} />)

  const submitButton = getByText('Save')
  fireEvent.click(submitButton, {
    preventDefault: () => { }
  })

  const errorMessage = getAllByText('Please provide a routine name and interval steps.')
  expect(errorMessage.length).toEqual(1)
  expect(container).toMatchSnapshot()
})

test('should remove step when pressed', () => {

  const { container, getAllByText, queryAllByText } = render(<IntervalForm onSubmit={onSubmit} interval={intervals[0]} />)
  const removeStepButton = getAllByText('Remove')

  fireEvent.click(removeStepButton[2], {
    preventDefault: () => { },
    currentTarget: { value: 2 }
  })

  const removedStepText = queryAllByText(intervals[0].steps[2].name)
  expect(removedStepText.length).toEqual(0)
  expect(container).toMatchSnapshot()

})