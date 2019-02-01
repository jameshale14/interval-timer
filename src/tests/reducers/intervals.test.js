import intervalsReducer from '../../reducers/intervals'
import { intervals } from '../fixtures/intervals'

test('should get intervals data', () => {
  const action = {
    type: 'GET_INTERVALS'
  }

  const state = intervalsReducer(intervals, action)

  expect(state).toEqual(intervals)

})

test('should return an empty array when no data in state', () => {
  const action = {
    type: 'GET_INTERVALS'
  }

  const state = intervalsReducer(undefined, action)

  expect(state).toEqual([])

})

test('should set intervals data', () => {
  const action = {
    type: 'SET_INTERVALS',
    intervals
  }
  const state = intervalsReducer(undefined, action)

  expect(state).toEqual(intervals)

})

test('should add an interval to the state', () => {
  const action = {
    type: 'CREATE_INTERVAL',
    interval: intervals[0]
  }

  const state = intervalsReducer(undefined, action)

  expect(state).toEqual([intervals[0]])
})

test('should add an interval to the state when one already exists', () => {
  const action = {
    type: 'CREATE_INTERVAL',
    interval: intervals[0]
  }

  const state = intervalsReducer([intervals[1]], action)

  expect(state).toEqual([intervals[1], intervals[0]])
})

test('should update an interval', () => {
  const action = {
    type: 'UPDATE_INTERVAL',
    id: 2,
    updates: {
      name: 'I am updated!'
    }
  }

  const state = intervalsReducer(intervals, action)

  const expectedIntervals = intervals
  expectedIntervals[1].name = 'I am updated!'

  expect(state).toEqual(expectedIntervals)
})

test('should not update an interval if the ID does not exist', () => {
  const action = {
    type: 'UPDATE_INTERVAL',
    id: 400,
    updates: {
      name: 'I should not be updated!'
    }
  }

  const state = intervalsReducer(intervals, action)

  expect(state).toEqual(intervals)
})

test('should delete interval from state', () => {
  const action = {
    type: 'DELETE_INTERVAL',
    id: 1
  }

  const state = intervalsReducer(intervals, action)

  expect(state).toEqual([intervals[1], intervals[2]])

})

test('should not delete interval when invalid ID sent through', () => {
  const action = {
    type: 'DELETE_INTERVAL',
    id: 40
  }

  const state = intervalsReducer(intervals, action)

  expect(state).toEqual(intervals)
})