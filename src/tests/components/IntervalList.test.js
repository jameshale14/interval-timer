import React from 'react'
import { shallow } from 'enzyme'
import { fireEvent, cleanup, render } from 'react-testing-library'
import { renderWithRouter } from '../utils/render'
import { IntervalList } from '../../components/IntervalList'
import { intervals } from '../fixtures/intervals'

afterEach(cleanup)

test('Should handle intervals', () => {
  const { container } = renderWithRouter(<IntervalList intervals={intervals} />)

  expect(container).toMatchSnapshot()
})

test('Should handle no intervals', () => {
  const { container } = renderWithRouter(<IntervalList />)

  expect(container).toMatchSnapshot()
})