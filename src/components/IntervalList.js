import React from 'react'
import { connect } from 'react-redux'

export const IntervalList = (props) => (
  <div>
    {props.intervals.map((interval) => {
      return (<div>{interval.name}</div>)
    })}
  </div>
)

const mapStateToProps = (state) => ({
  intervals: []
})

export default connect(mapStateToProps)(IntervalList)