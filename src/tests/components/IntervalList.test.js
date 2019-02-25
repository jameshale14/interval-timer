import React from 'react'
import { shallow } from 'enzyme'
import { IntervalList } from '../../components/IntervalList'
import { intervals } from '../fixtures/intervals'

test('Should handle intervals', () => {
  const wrapper = shallow(<IntervalList intervals={intervals} />)

  expect(wrapper).toMatchSnapshot()
})

test('Should handle no intervals', () => {
  const wrapper = shallow(<IntervalList />)

  expect(wrapper).toMatchSnapshot()
})