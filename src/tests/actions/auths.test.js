import { login, logout } from '../../actions/auth'

test('login should generate a login action object', () => {
  const action = login('thisIsAUid')
  expect(action).toEqual({
    type: 'LOGIN',
    uid: 'thisIsAUid'
  })
})

test('logout should generate a logout action object', () => {
  const action = logout()
  expect(action).toEqual({
    type: 'LOGOUT'
  })
})