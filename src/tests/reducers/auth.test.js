import authReducer from '../../reducers/auth'

test('should set uid for login', () => {
  const action = {
    type: 'LOGIN',
    uid: 'this is a UID'
  }

  const state = authReducer(undefined, action)
  expect(state).toEqual({ uid: 'this is a UID' })
})

test('should clear uid for logout', () => {
  const action = {
    type: 'LOGOUT'
  }

  const state = authReducer({ uid: 'toLogOut' }, action)
  expect(state).toEqual({})
})