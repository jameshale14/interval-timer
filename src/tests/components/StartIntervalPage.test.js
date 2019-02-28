import React from 'react'
import { shallow } from 'enzyme'
import { StartIntervalPage } from '../../components/StartIntervalPage'
import { intervals } from '../fixtures/intervals'

let wrapper

beforeEach(() => {
  // Use these two for mocking the intervals
  jest.clearAllTimers()
  jest.useFakeTimers()

  wrapper = shallow(<StartIntervalPage interval={intervals[0]} />)
})

afterEach(() => {
  jest.clearAllTimers()
})

test('StartIntervalPage should render correctly', () => {
  expect(wrapper).toMatchSnapshot()
})


test('Interval should start when button is clicked', () => {
  wrapper.find('button').at(0).simulate('click', {
    preventDefault: () => { }
  })
  expect(setInterval).toHaveBeenCalledTimes(1)
  expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000)
})


test('Interval should change state current step and time remaining when launched', () => {
  //start interval
  wrapper.find('button').at(0).simulate('click', {
    preventDefault: () => { }
  })

  expect(wrapper.state().currentStepIndex).toEqual(0)
  expect(wrapper.state().currentStepName).toEqual(intervals[0].steps[0].name)
  expect(wrapper.state().currentTimeRemaining).toEqual(intervals[0].steps[0].duration)
  expect(wrapper).toMatchSnapshot()

})


test('Interval should clear when stop button is clicked', () => {
  //start interval
  wrapper.find('button').at(0).simulate('click', {
    preventDefault: () => { }
  })
  //stop interval
  wrapper.find('button').at(1).simulate('click', {
    preventDefault: () => { }
  })

  expect(clearInterval).toHaveBeenCalledTimes(1)
})


test('Time remaining of interval step should reduce by 1 second for each second the interval runs for', () => {
  //start interval
  wrapper.find('button').at(0).simulate('click', {
    preventDefault: () => { }
  })

  jest.advanceTimersByTime(1000)

  expect(wrapper.state().currentStepIndex).toEqual(0)
  expect(wrapper.state().currentStepName).toEqual(intervals[0].steps[0].name)
  expect(wrapper.state().currentTimeRemaining).toEqual((intervals[0].steps[0].duration - 1))

  expect(wrapper).toMatchSnapshot()
})


test('When the timer reaches zero, the next second should set the interval step name and the time remaining to that of the next step', () => {
  //start interval
  wrapper.find('button').at(0).simulate('click', {
    preventDefault: () => { }
  })

  jest.advanceTimersByTime(1000 * (intervals[0].steps[0].duration + 1))

  expect(wrapper.state().currentStepIndex).toEqual(1)
  expect(wrapper.state().currentStepName).toEqual(intervals[0].steps[1].name)
  expect(wrapper.state().currentTimeRemaining).toEqual((intervals[0].steps[1].duration))
  expect(wrapper).toMatchSnapshot()
})


test('Should stop the interval after all of the steps have completed', () => {
  //start interval
  wrapper.find('button').at(0).simulate('click', {
    preventDefault: () => { }
  })

  for (let i = 0; i < intervals[0].steps.length; i++) {
    jest.advanceTimersByTime(1000 * (intervals[0].steps[i].duration + 1))
  }

  const lastStepIndex = intervals[0].steps.length - 1
  expect(wrapper.state().currentStepIndex).toEqual(lastStepIndex)
  expect(wrapper.state().currentStepName).toEqual(intervals[0].steps[lastStepIndex].name)
  expect(wrapper.state().currentTimeRemaining).toEqual(0)
  expect(setInterval).toHaveBeenCalledTimes(1)
  expect(clearInterval).toHaveBeenCalledTimes(1)
  expect(wrapper).toMatchSnapshot()

})

test('Stopping the timer should stop the time remaining from decreasing', () => {
  //start interval
  wrapper.find('button').at(0).simulate('click', {
    preventDefault: () => { }
  })

  jest.advanceTimersByTime(2000)

  //stop interval
  wrapper.find('button').at(1).simulate('click', {
    preventDefault: () => { }
  })

  jest.advanceTimersByTime(4000)

  expect(wrapper.state().currentStepIndex).toEqual(0)
  expect(wrapper.state().currentStepName).toEqual(intervals[0].steps[0].name)
  expect(wrapper.state().currentTimeRemaining).toEqual((intervals[0].steps[0].duration - 2))

  expect(wrapper).toMatchSnapshot()
})


test('interval should resume from current time remaining when start button is clicked after being stopped', () => {
  //start interval
  wrapper.find('button').at(0).simulate('click', {
    preventDefault: () => { }
  })

  jest.advanceTimersByTime(2000)

  //stop interval
  wrapper.find('button').at(1).simulate('click', {
    preventDefault: () => { }
  })

  //resume interval
  wrapper.find('button').at(0).simulate('click', {
    preventDefault: () => { }
  })

  jest.advanceTimersByTime(2000)

  expect(wrapper.state().currentStepIndex).toEqual(0)
  expect(wrapper.state().currentStepName).toEqual(intervals[0].steps[0].name)
  expect(wrapper.state().currentTimeRemaining).toEqual((intervals[0].steps[0].duration - 4))

  expect(wrapper).toMatchSnapshot()

})


test('"Restart Step" button should reinitialise current step', () => {
  //start interval
  wrapper.find('button').at(0).simulate('click', {
    preventDefault: () => { }
  })

  jest.advanceTimersByTime(25000)

  //stop interval
  wrapper.find('button').at(1).simulate('click', {
    preventDefault: () => { }
  })

  //re-start interval step
  wrapper.find('button').at(2).simulate('click', {
    preventDefault: () => { }
  })

  expect(wrapper.state().currentStepIndex).toEqual(1)
  expect(wrapper.state().currentStepName).toEqual(intervals[0].steps[1].name)
  expect(wrapper.state().currentTimeRemaining).toEqual((intervals[0].steps[1].duration))
  expect(wrapper).toMatchSnapshot()
})


test('"Restart Step" button should reinitialise current step', () => {
  //start interval
  wrapper.find('button').at(0).simulate('click', {
    preventDefault: () => { }
  })

  jest.advanceTimersByTime(25000)

  //stop interval
  wrapper.find('button').at(1).simulate('click', {
    preventDefault: () => { }
  })

  //re-start interval step
  wrapper.find('button').at(3).simulate('click', {
    preventDefault: () => { }
  })

  expect(wrapper.state().currentStepIndex).toEqual(0)
  expect(wrapper.state().currentStepName).toEqual(intervals[0].steps[0].name)
  expect(wrapper.state().currentTimeRemaining).toEqual((intervals[0].steps[0].duration))
  expect(wrapper).toMatchSnapshot()
})