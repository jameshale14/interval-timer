import React from 'react'
import { shallow } from 'enzyme'
import { EditIntervalPage } from '../../components/EditIntervalPage'
import { intervals } from '../fixtures/intervals'

let startUpdateInterval, history, wrapper

beforeEach(() => {
  startUpdateInterval = jest.fn()
  history = { push: jest.fn() }
  wrapper = shallow(<EditIntervalPage startUpdateInterval={startUpdateInterval} history={history} interval={intervals[1]} />)
})

test('should render EditIntervalPage correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
  wrapper.find('IntervalForm').prop('onSubmit')(intervals[1])
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(startUpdateInterval).toHaveBeenLastCalledWith(intervals[1].id, intervals[1])
})