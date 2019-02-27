import React from 'React'
import { shallow } from 'enzyme'
import StepForm from '../../components/StepForm'
import { intervals } from '../fixtures/intervals'

let wrapper, onSubmit

beforeEach(() => {
  onSubmit = jest.fn()
  wrapper = shallow(<StepForm onSubmit={onSubmit} />)
})

test('should render StepForm correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should throw error when adding step with no data', () => {
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  })
  expect(wrapper.state().error.length).toBeGreaterThan(0)
  expect(wrapper).toMatchSnapshot()
})

test('should call onSubmit when all data is provided', () => {

  //set the type of step
  wrapper.find('select').at(0).simulate('change', {
    target: { value: 'Activity' }
  })
  expect(wrapper.state().type).toEqual('Activity')
  expect(wrapper).toMatchSnapshot()

  //set the step name
  wrapper.find('input').at(0).simulate('change', {
    target: { value: 'Pull-ups' }
  })
  expect(wrapper.state().name).toEqual('Pull-ups')
  expect(wrapper).toMatchSnapshot()

  //set the step duration
  wrapper.find('input').at(1).simulate('change', {
    target: { value: 20 }
  })
  expect(wrapper.state().duration).toEqual(20)
  expect(wrapper).toMatchSnapshot()

  //add the step to the interval routine
  wrapper.find('button').at(0).simulate('click', {
    preventDefault: () => { }
  })

  expect(wrapper.state().error).toBe(undefined)
  expect(wrapper).toMatchSnapshot()
})

test('should disable the input for step name when step type is set to Rest', () => {
  wrapper.find('select').at(0).simulate('change', {
    target: { value: 'Rest' }
  })
  expect(wrapper.state().isRestType).toBe(true)
  expect(wrapper.state().name).toEqual('Rest')
  expect(wrapper).toMatchSnapshot()

  // Try to change the input, make sure it is disabled
  expect(wrapper.find('input').at(0).prop('disabled')).toBe(true)

})

test('should re-enable the input for step name when step type is set back to Activity', () => {
  wrapper.find('select').at(0).simulate('change', {
    target: { value: 'Rest' }
  })

  wrapper.find('select').at(0).simulate('change', {
    target: { value: 'Activity' }
  })

  // Check the name input is NOT disabled
  expect(wrapper.find('input').at(0).prop('disabled')).toBe(false)
  expect(wrapper.state().name).toEqual('')
}) 