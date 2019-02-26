import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const IntervalListItem = ({ id, name }) => (
  <Link to={`/edit/${id}`}>
    <h3>{name}</h3>
  </Link>
)

IntervalListItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string
}

export default IntervalListItem