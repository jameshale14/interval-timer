import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ExpenseListItem = ({ id, name }) => (

  <Link to={`/edit/${id}`}>
    <>
      <h3>{name}</h3>
    </>
  </Link>

)

ExpenseListItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string
}

export default ExpenseListItem