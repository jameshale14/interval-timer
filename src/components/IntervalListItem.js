import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const IntervalListItem = ({ id, name }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{name}</h3>
    </Link>
    <Link to={`/start/${id}`}>
      <h3>Start</h3>
    </Link>
  </div>

)

IntervalListItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string
}

export default IntervalListItem