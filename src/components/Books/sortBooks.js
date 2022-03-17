import PropTypes from 'prop-types'
import React from 'react'
import classes from './sortBooks.module.css'

const sortBooks = ({ sortArray }) => {
  return (
    <div className={classes.sortBooksStyle}>
      <select defaultValue='' onChange={(e) => sortArray(e.target.value)}>
        <option value='' disabled>
          Sort by:
        </option>
        <option value='title'>Title</option>
        <option value='author'>Author</option>
        <option value='genre'>Genre</option>
      </select>
    </div>
  )
}

sortBooks.propTypes = {
  sortArray: PropTypes.func.isRequired
}

export default sortBooks