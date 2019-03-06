import React from 'react'
import { cleanup } from 'react-testing-library'
import { renderWithRouter } from '../utils/render'
import { IntervalListItem } from '../../components/IntervalListItem'
import { intervals } from '../fixtures/intervals'

afterEach(cleanup)

test('IntervalListItem should render correctly', () => {
  const { container } = renderWithRouter(<IntervalListItem {...intervals[1]} />)

  expect(container).toMatchSnapshot()
})