import React from 'react'
import { fireEvent, cleanup, render, getByText } from 'react-testing-library'
import { StartIntervalPage } from '../../components/StartIntervalPage'
import { intervals } from '../fixtures/intervals'
import {
  oscillatorConnect,
  oscillatorStart,
  createOscillator,
  gainConnect,
  createGain,
  AudioContext,
  exponentialRampToValueAtTime
} from '../__mocks__/AudioContext'
import 'jest-dom/extend-expect'

window.AudioContext = AudioContext

beforeEach(() => {
  // Use these two for mocking the intervals
  jest.clearAllTimers()
  jest.useFakeTimers()

  window.AudioContext.mockClear()
  createOscillator.mockClear()
  createGain.mockClear()
  oscillatorConnect.mockClear()
  oscillatorStart.mockClear()
  gainConnect.mockClear()
  exponentialRampToValueAtTime.mockClear()

})

afterEach(() => {
  jest.clearAllTimers()
  cleanup()
})

test('StartIntervalPage should render correctly', () => {
  const { container } = render(<StartIntervalPage interval={intervals[0]} />)
  expect(container).toMatchSnapshot()
})


test('Interval should start when button is clicked', () => {
  const { getByText } = render(<StartIntervalPage interval={intervals[0]} />)
  const startButton = getByText('Start')
  fireEvent.click(startButton, {
    preventDefault: () => { }
  })
  expect(setInterval).toHaveBeenCalledTimes(1)
  expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000)
})


test('Interval should change state current step and time remaining when launched', () => {
  const { container, getByText, getByTestId } = render(<StartIntervalPage interval={intervals[0]} />)

  //start interval
  const startButton = getByText('Start')
  fireEvent.click(startButton, {
    preventDefault: () => { }
  })

  const currentStepName = getByTestId('step-name')
  const currentTimeRemaining = getByTestId('time-remaining')

  expect(currentStepName).toHaveTextContent(intervals[0].steps[0].name)
  expect(currentTimeRemaining).toHaveTextContent(intervals[0].steps[0].duration)
  expect(container).toMatchSnapshot()

})


test('Interval should clear when stop button is clicked', () => {
  const { container, getByText, getByTestId } = render(<StartIntervalPage interval={intervals[0]} />)

  //start interval
  const startButton = getByText('Start')
  fireEvent.click(startButton, {
    preventDefault: () => { }
  })

  //stop interval
  const stopButton = getByText('Stop')
  fireEvent.click(stopButton, {
    preventDefault: () => { }
  })

  expect(clearInterval).toHaveBeenCalledTimes(1)
})


test('Time remaining of interval step should reduce by 1 second for each second the interval runs for', () => {
  const { container, getByText, getByTestId } = render(<StartIntervalPage interval={intervals[0]} />)

  //start interval
  const startButton = getByText('Start')
  fireEvent.click(startButton, {
    preventDefault: () => { }
  })

  jest.advanceTimersByTime(1000)

  const currentStepName = getByTestId('step-name')
  const currentTimeRemaining = getByTestId('time-remaining')

  expect(currentStepName).toHaveTextContent(intervals[0].steps[0].name)
  expect(currentTimeRemaining).toHaveTextContent(intervals[0].steps[0].duration - 1)
  expect(container).toMatchSnapshot()
})


test('When the timer reaches zero, the next second should set the interval step name and the time remaining to that of the next step', () => {
  const { container, getByText, getByTestId } = render(<StartIntervalPage interval={intervals[0]} />)

  //start interval
  const startButton = getByText('Start')
  fireEvent.click(startButton, {
    preventDefault: () => { }
  })

  // jest.advanceTimersByTime(1000 * (parseInt(intervals[0].steps[0].duration) + 1))
  jest.advanceTimersByTime(1000 * (parseInt(intervals[0].steps[0].duration)))

  const currentStepName = getByTestId('step-name')
  const currentTimeRemaining = getByTestId('time-remaining')

  expect(currentStepName).toHaveTextContent(intervals[0].steps[1].name)
  expect(currentTimeRemaining).toHaveTextContent((intervals[0].steps[1].duration))
  expect(container).toMatchSnapshot()
})


test('Should stop the interval after all of the steps have completed', () => {
  const { container, getByText, getByTestId } = render(<StartIntervalPage interval={intervals[0]} />)

  //start interval
  const startButton = getByText('Start')
  fireEvent.click(startButton, {
    preventDefault: () => { }
  })

  for (let i = 0; i < intervals[0].steps.length; i++) {
    jest.advanceTimersByTime(1000 * (intervals[0].steps[i].duration + 1))
  }

  const currentStepName = getByTestId('step-name')
  const currentTimeRemaining = getByTestId('time-remaining')

  const lastStepIndex = intervals[0].steps.length - 1
  expect(currentStepName).toHaveTextContent(intervals[0].steps[lastStepIndex].name)
  expect(currentTimeRemaining).toHaveTextContent(1)
  expect(setInterval).toHaveBeenCalledTimes(1)
  expect(clearInterval).toHaveBeenCalledTimes(1)
  expect(container).toMatchSnapshot()

})

test('Stopping the timer should stop the time remaining from decreasing', () => {
  const { container, getByText, getByTestId } = render(<StartIntervalPage interval={intervals[0]} />)

  //start interval
  const startButton = getByText('Start')
  fireEvent.click(startButton, {
    preventDefault: () => { }
  })

  jest.advanceTimersByTime(2000)

  //stop interval
  const stopButton = getByText('Stop')
  fireEvent.click(stopButton, {
    preventDefault: () => { }
  })


  jest.advanceTimersByTime(4000)
  const currentStepName = getByTestId('step-name')
  const currentTimeRemaining = getByTestId('time-remaining')

  expect(currentStepName).toHaveTextContent(intervals[0].steps[0].name)
  expect(currentTimeRemaining).toHaveTextContent((intervals[0].steps[0].duration - 2))

  expect(container).toMatchSnapshot()
})


test('interval should resume from current time remaining when start button is clicked after being stopped', () => {
  const { container, getByText, getByTestId } = render(<StartIntervalPage interval={intervals[0]} />)

  //start interval
  const startButton = getByText('Start')
  fireEvent.click(startButton, {
    preventDefault: () => { }
  })

  jest.advanceTimersByTime(2000)

  //stop interval
  const stopButton = getByText('Stop')
  fireEvent.click(stopButton, {
    preventDefault: () => { }
  })

  //resume interval
  fireEvent.click(startButton, {
    preventDefault: () => { }
  })

  jest.advanceTimersByTime(2000)

  const currentStepName = getByTestId('step-name')
  const currentTimeRemaining = getByTestId('time-remaining')

  expect(currentStepName).toHaveTextContent(intervals[0].steps[0].name)
  expect(currentTimeRemaining).toHaveTextContent((intervals[0].steps[0].duration - 4))

  expect(container).toMatchSnapshot()

})


test('"Restart Step" button should reinitialise current step', () => {
  const { container, getByText, getByTestId } = render(<StartIntervalPage interval={intervals[0]} />)

  //start interval
  const startButton = getByText('Start')
  fireEvent.click(startButton, {
    preventDefault: () => { }
  })

  jest.advanceTimersByTime(25000)

  //stop interval
  const stopButton = getByText('Stop')
  fireEvent.click(stopButton, {
    preventDefault: () => { }
  })

  //re-start interval step
  const restartIntervalStepButton = getByText('Restart Step')
  fireEvent.click(restartIntervalStepButton, {
    preventDefault: () => { }
  })

  const currentStepName = getByTestId('step-name')
  const currentTimeRemaining = getByTestId('time-remaining')

  expect(currentStepName).toHaveTextContent(intervals[0].steps[1].name)
  expect(currentTimeRemaining).toHaveTextContent((intervals[0].steps[1].duration))
  expect(container).toMatchSnapshot()
})


test('"Restart Interval" button should reinitialise whole routine', () => {
  const { container, getByText, getByTestId } = render(<StartIntervalPage interval={intervals[0]} />)

  //start interval
  const startButton = getByText('Start')
  fireEvent.click(startButton, {
    preventDefault: () => { }
  })

  jest.advanceTimersByTime(25000)

  //stop interval
  const stopButton = getByText('Stop')
  fireEvent.click(stopButton, {
    preventDefault: () => { }
  })

  //re-start interval step
  const restartIntervalButton = getByText('Restart Interval')
  fireEvent.click(restartIntervalButton, {
    preventDefault: () => { }
  })

  const currentStepName = getByTestId('step-name')
  const currentTimeRemaining = getByTestId('time-remaining')

  expect(currentStepName).toHaveTextContent(intervals[0].steps[0].name)
  expect(currentTimeRemaining).toHaveTextContent((intervals[0].steps[0].duration))
  expect(container).toMatchSnapshot()
})

test('when the timer reaches 3, 2 and 1 second remaining, there should be an audio signal created', () => {
  const { container, getByText, getByTestId } = render(<StartIntervalPage interval={intervals[0]} />)

  //start interval
  const startButton = getByText('Start')
  fireEvent.click(startButton, {
    preventDefault: () => { }
  })

  jest.advanceTimersByTime(16000)

  const currentStepName = getByTestId('step-name')
  const currentTimeRemaining = getByTestId('time-remaining')

  expect(currentTimeRemaining).toHaveTextContent(4)
  expect(gainConnect).toHaveBeenCalledTimes(0)
  expect(oscillatorConnect).toHaveBeenCalledTimes(0)
  expect(oscillatorStart).toHaveBeenCalledTimes(0)
  expect(exponentialRampToValueAtTime).toHaveBeenCalledTimes(0)

  jest.advanceTimersByTime(1000)

  expect(currentTimeRemaining).toHaveTextContent(3)
  expect(gainConnect).toHaveBeenCalledTimes(1)
  expect(oscillatorConnect).toHaveBeenCalledTimes(1)
  expect(oscillatorStart).toHaveBeenCalledTimes(1)
  expect(exponentialRampToValueAtTime).toHaveBeenCalledTimes(1)
  expect(exponentialRampToValueAtTime).toHaveBeenLastCalledWith(0.00001, 1)

  jest.advanceTimersByTime(1000)
  expect(currentTimeRemaining).toHaveTextContent(2)
  expect(gainConnect).toHaveBeenCalledTimes(2)
  expect(oscillatorConnect).toHaveBeenCalledTimes(2)
  expect(oscillatorStart).toHaveBeenCalledTimes(2)
  expect(exponentialRampToValueAtTime).toHaveBeenCalledTimes(2)
  expect(exponentialRampToValueAtTime).toHaveBeenLastCalledWith(0.00001, 1)

  jest.advanceTimersByTime(1000)
  expect(currentTimeRemaining).toHaveTextContent(1)
  expect(gainConnect).toHaveBeenCalledTimes(3)
  expect(oscillatorConnect).toHaveBeenCalledTimes(3)
  expect(oscillatorStart).toHaveBeenCalledTimes(3)
  expect(exponentialRampToValueAtTime).toHaveBeenCalledTimes(3)
  expect(exponentialRampToValueAtTime).toHaveBeenLastCalledWith(0.00001, 1)
})

test('when the timer reaches zero the sound should last for longer', () => {
  const { container, getByText, getByTestId } = render(<StartIntervalPage interval={intervals[0]} />)

  //start interval
  const startButton = getByText('Start')
  fireEvent.click(startButton, {
    preventDefault: () => { }
  })

  jest.advanceTimersByTime(20000)

  const currentStepName = getByTestId('step-name')
  const currentTimeRemaining = getByTestId('time-remaining')

  expect(currentTimeRemaining).toHaveTextContent(0)
  expect(gainConnect).toHaveBeenCalledTimes(4)
  expect(oscillatorConnect).toHaveBeenCalledTimes(4)
  expect(oscillatorStart).toHaveBeenCalledTimes(4)
  expect(exponentialRampToValueAtTime).toHaveBeenCalledTimes(4)
  expect(exponentialRampToValueAtTime).toHaveBeenLastCalledWith(0.00001, 2.5)
})