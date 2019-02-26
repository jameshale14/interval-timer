import React from 'react'
import { shallow } from 'enzyme'
import { EditIntervalPage } from '../../components/EditIntervalPage'
import { intervals } from '../fixtures/intervals'

let startUpdateInterval, startDeleteInterval, history, wrapper

beforeEach(() => {
  startUpdateInterval = jest.fn()
  startDeleteInterval = jest.fn()
  history = { push: jest.fn() }
  wrapper = shallow(<EditIntervalPage startDeleteInterval={startDeleteInterval} startUpdateInterval={startUpdateInterval} history={history} interval={intervals[1]} />)
})

test('should render EditIntervalPage correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle deleting an interval', () => {
  wrapper.find('button').at(0).simulate('click', {
    preventDefault: () => { }
  })
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(startDeleteInterval).toHaveBeenLastCalledWith(intervals[1].id)
})

test('should handle onSubmit', () => {
  wrapper.find('IntervalForm').prop('onSubmit')(intervals[1])
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(startUpdateInterval).toHaveBeenLastCalledWith(intervals[1].id, intervals[1])
})