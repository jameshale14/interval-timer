import React from 'react'
import { cleanup, render } from 'react-testing-library'
import LoadingPage from '../../components/LoadingPage'

afterEach(cleanup)

test('should render LoadingPage correctly', () => {
  const { container } = render(<LoadingPage />)
  expect(container).toMatchSnapshot()
})