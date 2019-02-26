import React from 'react'
import { shallow } from 'enzyme'
import IntervalForm from '../../components/IntervalForm'
import { intervals } from '../fixtures/intervals'

let wrapper, onSubmit

beforeEach(() => {
  onSubmit = jest.fn()
  wrapper = shallow(<IntervalForm onSubmit={onSubmit} />)
})

test('should render empty IntervalForm correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

//TODO IntervalForm should render correctly with interval data sent over
test('should render pre-filled IntervalForm when sending interval data', () => {
  const wrapper = shallow(<IntervalForm onSubmit={onSubmit} interval={intervals[1]} />)
  expect(wrapper).toMatchSnapshot()
})

//TODO test handleAddStep works
test('should add interval step to state and render to screen', () => {

  //set the type of step
  wrapper.find('select').at(0).simulate('change', {
    target: { value: 'Rest' }
  })
  expect(wrapper.state().newStep.type).toEqual('Rest')
  expect(wrapper).toMatchSnapshot()

  //set the step name
  wrapper.find('input').at(1).simulate('change', {
    target: { value: 'Pull-ups' }
  })
  expect(wrapper.state().newStep.name).toEqual('Pull-ups')
  expect(wrapper).toMatchSnapshot()

  //set the step duration
  wrapper.find('input').at(2).simulate('change', {
    target: { value: 20 }
  })
  expect(wrapper.state().newStep.duration).toEqual(20)
  expect(wrapper).toMatchSnapshot()

  //add the step to the interval routine
  wrapper.find('button').at(1).simulate('click', {
    preventDefault: () => { }
  })

  expect(wrapper.state().stepError).toBe(undefined)
  expect(wrapper.state().steps.length).toEqual(1)
  expect(wrapper).toMatchSnapshot()
})

//TODO test handleAddStep shows errors before enough data is entered
test('should throw error when adding step with no data', () => {
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  })
  expect(wrapper.state().stepError.length).toBeGreaterThan(0)
  expect(wrapper).toMatchSnapshot()
})

//TODO test handleOnSave fires
test('should fire a save event when saved with valid submission', () => {
  wrapper.find('input').at(0).simulate('change', {
    target: { value: 'New Interval Routine' }
  })

  //set the type of step
  wrapper.find('select').at(0).simulate('change', {
    target: { value: 'Activity' }
  })

  //set the step name
  wrapper.find('input').at(1).simulate('change', {
    target: { value: 'Push-ups' }
  })

  //set the step duration
  wrapper.find('input').at(2).simulate('change', {
    target: { value: 30 }
  })

  //add the step to the interval routine
  wrapper.find('button').at(1).simulate('click', {
    preventDefault: () => { }
  })

  wrapper.find('button').at(0).simulate('click', {
    preventDefault: () => { }
  })
  expect(onSubmit).toHaveBeenLastCalledWith({
    name: 'New Interval Routine',
    steps: [
      {
        type: 'Activity',
        name: 'Push-ups',
        duration: 30
      }
    ]
  })
})

//TODO test handleOnSave shows errors before enough data is entered
test('should show an error when saving without enough data', () => {
  wrapper.find('button').at(0).simulate('click', {
    preventDefault: () => { }
  })
  expect(wrapper.state().saveError.length).toBeGreaterThan(0)
  expect(wrapper).toMatchSnapshot()
})

test('should remove step when pressed', () => {
  const wrapperWithDetail = shallow(<IntervalForm onSubmit={onSubmit} interval={intervals[0]} />)

  wrapperWithDetail.find('button').at(2).simulate('click', {
    preventDefault: () => { },
    currentTarget: { value: 1 }
  })

  expect(wrapperWithDetail.state().steps).toEqual([intervals[0].steps[0], intervals[0].steps[2], intervals[0].steps[3]])
  expect(wrapperWithDetail).toMatchSnapshot()

})