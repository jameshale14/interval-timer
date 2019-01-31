export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_INTERVALS':
      return state
    case 'CREATE_INTERVAL':
      return [...state, action.interval]
    case 'UPDATE_INTERVAL':
      return state.map((interval) => {
        if (interval.id === action.id) {
          return {
            ...interval,
            ...action.updates
          }
        } else {
          return interval
        }
      })
    case 'DELETE_INTERVAL':
      return state.filter((interval) => {
        return interval.id !== action.id
      })
    case 'SET_INTERVALS':
      return action.intervals
    default:
      return state
  }
}