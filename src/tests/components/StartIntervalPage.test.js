import React from 'react'
import { shallow } from 'enzyme'
import { StartIntervalPage } from '../../components/StartIntervalPage'
import { intervals } from '../fixtures/intervals'

let wrapper

beforeEach(() => {
  wrapper = shallow(<StartIntervalPage interval={intervals[0]} />)
})

test('StartIntervalPage should render correclty', () => {
  expect(wrapper).toMatchSnapshot()
})

//TODO - interval should start when button is clicked

//TODO - interval should change state current step and time remaining when launched

//TODO - interval should clear when stop button is clicked

//TODO - interval should resume when start button is clicked after being stopped

//TODO - restart step button should re-initialise step

//TODO - restart interval should re-initialise interval