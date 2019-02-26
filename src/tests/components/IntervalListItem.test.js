import React from 'react'
import { shallow } from 'enzyme'
import { IntervalListItem } from '../../components/IntervalListItem'
import { intervals } from '../fixtures/intervals'

test('IntervalListItem should render correctly', () => {
  const wrapper = shallow(<IntervalListItem {...intervals[1]} />)

  expect(wrapper).toMatchSnapshot()
})