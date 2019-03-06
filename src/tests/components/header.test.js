import React from 'react'
import { fireEvent, cleanup } from 'react-testing-library'
import { renderWithRouter } from '../utils/render'
import { Header } from '../../components/Header'

let startLogout

beforeEach(() => {
  startLogout = jest.fn()
})

afterEach(cleanup)

test('should render Header correctly', () => {
  const { container } = renderWithRouter(<Header startLogout={startLogout} />)
  expect(container).toMatchSnapshot()
})

test('should call startLogout on button click', () => {
  const { getByText } = renderWithRouter(<Header startLogout={startLogout} />)
  const logoutButton = getByText('Logout')
  fireEvent.click(logoutButton)
  expect(startLogout).toHaveBeenCalled()
})