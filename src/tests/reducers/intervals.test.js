import intervalsReducer from '../../reducers/intervals'
import intervals from '../fixtures/intervals'

test('should set intervals data', () => {
  const action = {
    type: 'SET_INTERVALS',
    intervals
  }

  const state = intervalsReducer(undefined, action)

  expect(state).toEqual(intervals)

})