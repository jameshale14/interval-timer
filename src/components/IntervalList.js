import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import IntervalListItem from './IntervalListItem'

export const IntervalList = (props) => (
  <div>
    <h1>Intervals</h1>

    {(props.intervals && props.intervals.length) > 0 ? (props.intervals.map((interval) => {
      return (
        <IntervalListItem key={interval.id} {...interval} />
      )
    }))
      : (
        <p>No intervals</p>
      )
    }
  </div>
)

IntervalList.propTypes = {
  intervals: PropTypes.array
}

const mapStateToProps = (state) => ({
  intervals: state.intervals
})

export default connect(mapStateToProps)(IntervalList)