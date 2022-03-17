import PropTypes from 'prop-types'
import React from 'react'
import classes from './book.module.css'

const Book = ({ book, deleteBook, Toggleable }) => {
  return (
    <div className={classes.bookStyle}>
      <p>
        <span className={classes.bookTitle}>{book.title}</span> by{' '}
        {book.author}
      </p>

      <Toggleable buttonLabel='view'>
        <p>
          <button 
            type='deleteBook'
            value={book.id}
            name='deleteBook'
            onClick={() => deleteBook(book.id)}
          >
            delete
          </button>
        </p>
      </Toggleable>
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  deleteBook: PropTypes.func.isRequired,
  Toggleable: PropTypes.object.isRequired,
}

export default Book