import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  getIntervals,
  createInterval,
  startCreateInterval,
  updateInterval,
  startUpdateInterval,
  deleteInterval,
  startDeleteInterval,
  setIntervals,
  startSetIntervals
} from '../../actions/intervals'
import { intervals } from '../fixtures/intervals'
import database from '../../firebase/firebase'

const uid = 'thisismytestuid'
const defaultAuthState = { auth: { uid } }
const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
  const intervalsData = {}
  intervals.forEach(({ id, name, steps }) => {
    intervalsData[id] = { name, steps }
  })
  database.ref(`users/${uid}/intervals`).set(intervalsData).then(() => done())
})

test('should generate a getIntervals action object', () => {
  const action = getIntervals()

  expect(action).toEqual({
    type: 'GET_INTERVALS'
  })
})

test('should generate a createInterval action object', () => {
  const action = createInterval(intervals[1])

  expect(action).toEqual({
    type: 'CREATE_INTERVAL',
    interval: intervals[1]
  })
})

test('should create an interval in firebase', (done) => {
  const store = createMockStore(defaultAuthState)
  const newInterval = {
    name: 'EPIC exercises',
    steps: [
      {
        type: 'activity',
        name: 'push ups',
        duration: 30000
      },
      {
        type: 'rest',
        name: 'rest',
        duration: 15000
      }
    ]
  }

  store.dispatch(startCreateInterval(newInterval))
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'CREATE_INTERVAL',
        interval: {
          id: expect.any(String),
          ...newInterval
        }
      })
      return database.ref(`users/${uid}/intervals/${actions[0].interval.id}`).once('value')
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(newInterval)
      done()
    })

})

test('should generate an updateInterval action object', () => {
  const updates = { name: 'updated', steps: [] }
  const action = updateInterval(8, updates)

  expect(action).toEqual({
    type: 'UPDATE_INTERVAL',
    id: 8,
    updates
  })
})

test('should update interval on Firebase', (done) => {
  const store = createMockStore(defaultAuthState)
  const editedData = {
    name: 'meditation focus round 2',
    steps: [
      {
        type: 'activity',
        name: 'focus',
        duration: 50000
      },
      {
        type: 'rest',
        name: 'resting',
        duration: 15000
      }
    ]
  }

  store.dispatch(startUpdateInterval("2", editedData))
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'UPDATE_INTERVAL',
        id: "2",
        updates: editedData
      })
      return database.ref(`users/${uid}/intervals/2`).once('value')
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(editedData)
      done()
    })
})

test('should generate a deleteInterval action object', () => {
  const action = deleteInterval(2)

  expect(action).toEqual({
    type: 'DELETE_INTERVAL',
    id: 2
  })
})

test('should delete interval from Firebase', (done) => {
  const store = createMockStore(defaultAuthState)
  store.dispatch(startDeleteInterval("2"))
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'DELETE_INTERVAL',
        id: "2"
      })
      return database.ref(`users/${uid}/intervals/2`).once('value')
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy()
      done()
    })
})

test('should generate a setIntervals action object', () => {
  const action = setIntervals(intervals)

  expect(action).toEqual({
    type: 'SET_INTERVALS',
    intervals
  })
})

test('should fetch the intervals from Firebase', (done) => {
  const store = createMockStore(defaultAuthState)
  store.dispatch(startSetIntervals())
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'SET_INTERVALS',
        intervals
      })
      done()
    })
})