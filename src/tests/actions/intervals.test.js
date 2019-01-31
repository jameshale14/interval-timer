import {
  getIntervals,
  createInterval,
  updateInterval,
  deleteInterval,
  setIntervals
} from '../../actions/intervals'
import { intervals } from '../fixtures/intervals'

test('should generate a getIntervals action object', () => {
  const action = getIntervals()

  expect(action).toEqual({
    type: 'GET_INTERVALS'
  })
})

test('should generate a createInterval action object', () => {
  const action = createInterval(intervals[1])

  expect(action).toEqual({
    type: 'CREATE_INTERVAL',
    interval: intervals[1]
  })
})

test('should generate an updateInterval action object', () => {
  const updates = { name: 'updated', steps: [] }
  const action = updateInterval(8, updates)

  expect(action).toEqual({
    type: 'UPDATE_INTERVAL',
    id: 8,
    updates
  })
})

test('should generate a deleteInterval action object', () => {
  const action = deleteInterval(2)

  expect(action).toEqual({
    type: 'DELETE_INTERVAL',
    id: 2
  })
})

test('should generate a setIntervals action object', () => {
  const action = setIntervals(intervals)

  expect(action).toEqual({
    type: 'SET_INTERVALS',
    intervals
  })
})