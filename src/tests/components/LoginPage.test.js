import React from 'react'
import { fireEvent, cleanup, render } from 'react-testing-library'
import { LoginPage } from '../../components/LoginPage'

let startLogin

beforeEach(() => {
  startLogin = jest.fn()
})

afterEach(cleanup)

test('should render LoginPage correctly', () => {
  const { container } = render(<LoginPage startLogin={startLogin} />)
  expect(container).toMatchSnapshot()
})

test('should call startLogin on button click', () => {
  const { getByText } = render(<LoginPage startLogin={startLogin} />)
  const loginButton = getByText('Login with Google')
  fireEvent.click(loginButton)
  expect(startLogin).toHaveBeenCalled()
})