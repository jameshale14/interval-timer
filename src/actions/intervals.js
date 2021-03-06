import database from '../firebase/firebase'

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
export const startCreateInterval = (intervalData) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const {
      name = '',
      steps = []
    } = intervalData
    const interval = { name, steps }
    return database.ref(`users/${uid}/intervals`).push(interval)
      .then((ref) => {
        dispatch(createInterval({
          id: ref.key,
          ...interval
        }))
      })
  }
}


//UPDATE_INTERVAL
export const updateInterval = (id, updates) => ({
  type: 'UPDATE_INTERVAL',
  id,
  updates
})

//START_UPDATE_INTERVAL
export const startUpdateInterval = (id, updates = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid

    // const {
    //   name = '',
    //   steps = []
    // } = updates
    // const interval = { name, steps }

    return database.ref(`users/${uid}/intervals/${id}`).update(updates)
      .then(() => {
        dispatch(updateInterval(id, updates))
      })
  }
}

//DELETE_INTERVAL
export const deleteInterval = (id) => ({
  type: 'DELETE_INTERVAL',
  id
})

//START_DELETE_INTERVAL

export const startDeleteInterval = (id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database.ref(`users/${uid}/intervals/${id}`).remove()
      .then(() => {
        dispatch(deleteInterval(id))
      })
  }
}

//SET_INTERVALS
export const setIntervals = (intervals) => ({
  type: 'SET_INTERVALS',
  intervals
})

//START_SET_INTERVALS
export const startSetIntervals = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database.ref(`users/${uid}/intervals`).once('value')
      .then((snapshot) => {
        const intervals = []
        snapshot.forEach((childSnapshot) => {
          intervals.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          })
        })
        dispatch(setIntervals(intervals))
      })
  }
}