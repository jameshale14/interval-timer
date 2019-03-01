export const oscillatorConnect = jest.fn()
export const oscillatorStart = jest.fn()
export const createOscillator = jest.fn(() => {
  return {
    type: '',
    connect: oscillatorConnect,
    frequency: {
      value: 0
    },
    start: oscillatorStart
  }
})

export const gainConnect = jest.fn()
export const exponentialRampToValueAtTime = jest.fn()
export const createGain = jest.fn(() => {
  return {
    connect: gainConnect,
    gain: {
      exponentialRampToValueAtTime: exponentialRampToValueAtTime
    }
  }
})

export const AudioContext = jest.fn(() => {
  return {
    createOscillator: createOscillator,
    createGain: createGain,
    destination: 'destinationUnknown',
    currentTime: 0
  }
})
