import React from 'react'
import { fireEvent, cleanup, render } from 'react-testing-library'
import { EditIntervalPage } from '../../components/EditIntervalPage'
import { intervals } from '../fixtures/intervals'

let startUpdateInterval, startDeleteInterval, history

beforeEach(() => {
  startUpdateInterval = jest.fn()
  startDeleteInterval = jest.fn()
  history = { push: jest.fn() }
})

afterEach(cleanup)


test('should render EditIntervalPage correctly', () => {
  const { container } = render(<EditIntervalPage startDeleteInterval={startDeleteInterval} startUpdateInterval={startUpdateInterval} history={history} interval={intervals[1]} />)
  expect(container).toMatchSnapshot()
})

test('should handle deleting an interval', () => {
  const { getByText } = render(<EditIntervalPage startDeleteInterval={startDeleteInterval} startUpdateInterval={startUpdateInterval} history={history} interval={intervals[1]} />)
  const deleteButton = getByText('Remove Interval')
  fireEvent.click(deleteButton, {
    preventDefault: () => { }
  })
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(startDeleteInterval).toHaveBeenLastCalledWith(intervals[1].id)
})

test('should handle onSubmit', () => {
  const { getByText } = render(<EditIntervalPage startDeleteInterval={startDeleteInterval} startUpdateInterval={startUpdateInterval} history={history} interval={intervals[1]} />)
  const submitButton = getByText('Save')
  fireEvent.click(submitButton, {
    preventDefault: () => { }
  })
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(startUpdateInterval).toHaveBeenLastCalledWith(intervals[1].id, { name: intervals[1].name, steps: intervals[1].steps })
})