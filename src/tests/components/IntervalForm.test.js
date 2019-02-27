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

test('should render pre-filled IntervalForm when sending interval data', () => {
  const wrapper = shallow(<IntervalForm onSubmit={onSubmit} interval={intervals[1]} />)
  expect(wrapper).toMatchSnapshot()
})

test('should add step to step list and render to screen when added from StepForm', () => {
  const newStep = {
    type: 'Activity',
    name: 'Squats',
    duration: 30
  }

  wrapper.find('StepForm').prop('onSubmit')(newStep)
  expect(wrapper.state('steps')).toEqual([newStep])
  expect(wrapper).toMatchSnapshot()
})

test('should fire a save event when saved with valid submission', () => {
  wrapper.find('input').at(0).simulate('change', {
    target: { value: 'New Interval Routine' }
  })

  const newStep = {
    type: 'Activity',
    name: 'Push-ups',
    duration: 30
  }

  wrapper.find('StepForm').prop('onSubmit')(newStep)

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