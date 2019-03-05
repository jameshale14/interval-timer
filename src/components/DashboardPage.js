/*eslint-env browser*/

import React from 'react'
import { Link } from 'react-router-dom'
import IntervalList from './IntervalList'

class DashBoardPage extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    document.title = 'Dashboard | Interval Timer'
  }

  componentDidUpdate() {
    document.title = 'Dashboard | Interval Timer'
  }
  render() {
    return (
      <div>
        <Link className='button' to='/create'>New Interval</Link>
        <IntervalList />
      </div>
    )
  }
}
export default DashBoardPage 