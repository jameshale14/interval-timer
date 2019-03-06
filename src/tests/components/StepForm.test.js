import React from 'React'
import { fireEvent, cleanup, render } from 'react-testing-library'
import StepForm from '../../components/StepForm'
import 'jest-dom/extend-expect'

let onSubmit

beforeEach(() => {
  onSubmit = jest.fn()
})

afterEach(cleanup)

test('should render StepForm correctly', () => {
  const { container } = render(<StepForm onSubmit={onSubmit} />)
  expect(container).toMatchSnapshot()
})

test('should throw error when adding step with no data', () => {
  const { container, getByText, getAllByText } = render(<StepForm onSubmit={onSubmit} />)
  const addStepButton = getByText('Add Step')
  fireEvent.click(addStepButton, {
    preventDefault: () => { }
  })

  const errorMessage = getAllByText('Please fill in all fields')
  expect(errorMessage.length).toBe(1)
  expect(container).toMatchSnapshot()
})

test('should call onSubmit when all data is provided', () => {
  const { container, getByText, queryAllByText, getByLabelText } = render(<StepForm onSubmit={onSubmit} />)

  const newStep = {
    type: 'Activity',
    name: 'Pull-ups',
    duration: '20'
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


  expect(onSubmit).toHaveBeenCalled()

  const errorMessage = queryAllByText('Please fill in all fields')

  expect(errorMessage.length).toBe(0)
  expect(container).toMatchSnapshot()
})

test('should disable the input for step name when step type is set to Rest', () => {
  const { getByLabelText } = render(<StepForm onSubmit={onSubmit} />)

  const stepType = getByLabelText('Step Type')
  const stepName = getByLabelText('Step Name')

  fireEvent.change(
    stepType,
    { target: { value: 'Rest' } }
  )

  expect(stepName).toHaveAttribute('disabled')
  expect(stepName.value).toBe('Rest')
})

test('should re-enable the input for step name when step type is set back to Activity', () => {
  const { getByLabelText } = render(<StepForm onSubmit={onSubmit} />)

  const stepType = getByLabelText('Step Type')
  const stepName = getByLabelText('Step Name')

  fireEvent.change(
    stepType,
    { target: { value: 'Rest' } }
  )

  fireEvent.change(
    stepType,
    { target: { value: 'Activity' } }
  )

  expect(stepName).not.toHaveAttribute('disabled')
  expect(stepName.value).toBe('')
}) 