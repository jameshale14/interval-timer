import React from 'react'
import { cleanup } from 'react-testing-library'
import { renderWithRouter } from '../utils/render'
import NotFoundPage from '../../components/NotFoundPage'

afterEach(cleanup)

test('should render NotFoundPage correctly', () => {
  const { container } = renderWithRouter(<NotFoundPage />)
  expect(container).toMatchSnapshot()

})