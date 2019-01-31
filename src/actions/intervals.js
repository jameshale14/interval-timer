//GET_INTERVALS
export const getIntervals = () => ({
  type: 'GET_INTERVALS',
})

//START_GET_INTERVALS

//CREATE_INTERVAL
export const createInterval = (interval) => ({
  type: 'CREATE_INTERVAL',
  interval
})

//START_CREATE_INTERVAL

//UPDATE_INTERVAL
export const updateInterval = (id, updates) => ({
  type: 'UPDATE_INTERVAL',
  id,
  updates
})

//START_UPDATE_INTERVAL

//DELETE_INTERVAL
export const deleteInterval = (id) => ({
  type: 'DELETE_INTERVAL',
  id
})

//START_DELETE_INTERVAL

//SET_INTERVALS
export const setIntervals = (intervals) => ({
  type: 'SET_INTERVALS',
  intervals
})

//START_SET_INTERVALS
