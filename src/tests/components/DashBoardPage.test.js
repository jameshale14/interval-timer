import React from 'react'
import { fireEvent, cleanup } from 'react-testing-library'
import {renderWithRouterAndRedux} from '../utils/render'
import DashBoardPage from '../../components/DashboardPage'

afterEach(cleanup)

test('should render dashboard correctly', () => {
  const { container } = renderWithRouterAndRedux(<DashBoardPage />)
  expect(container).toMatchSnapshot()

})

test('should navigate to new interval page', () => {
  const { getByText, history } = renderWithRouterAndRedux(<DashBoardPage />)
  const leftClick = { button: 0 }
  const newIntervalButton = getByText('New Interval')
  fireEvent.click(newIntervalButton, leftClick)
  expect(history.location.pathname).toEqual('/create')
})