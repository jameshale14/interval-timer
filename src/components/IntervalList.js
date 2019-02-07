import React from 'react'
import { connect } from 'react-redux'

export const IntervalList = (props) => (
  <div>
    <h1>Intervals</h1>

    {props.intervals.length > 0 ? (props.intervals.map((interval) => {
      return (<div key={interval.id}>{interval.name}</div>)
    }))
      : (
        <p>No intervals</p>
      )
    }
  </div>
)

const mapStateToProps = (state) => ({
  intervals: state.intervals
})

export default connect(mapStateToProps)(IntervalList)