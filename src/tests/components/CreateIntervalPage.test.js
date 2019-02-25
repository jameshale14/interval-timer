import React from 'react'
import { shallow } from 'enzyme'
import { CreateIntervalPage } from '../../components/CreateIntervalPage'
import { intervals } from '../fixtures/intervals'

let startCreateInterval, history, wrapper

beforeEach(() => {
  startCreateInterval = jest.fn()
  history = { push: jest.fn() }
  wrapper = shallow(<CreateIntervalPage startCreateInterval={startCreateInterval} history={history} />)
})

test('should render CreateIntervalPage correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
  wrapper.find('IntervalForm').prop('onSubmit')(intervals[1])
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(startCreateInterval).toHaveBeenLastCalledWith(intervals[1])
})