import React from 'react'
import { Link } from 'react-router-dom'
import IntervalList from './IntervalList'

const DashBoardPage = () => (
  <div>
    <Link className='button' to='/create'>New Interval</Link>
    <IntervalList />
  </div>
)

export default DashBoardPage 