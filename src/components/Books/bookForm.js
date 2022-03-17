import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import Button from '../UI/button'
import classes from './bookForm.module.css'

const BookForm = ({ addBook }) => {
  const titleInputRef = useRef()
  const authorInputRef = useRef()
  const genreInputRef = useRef()
  const publishedInputRef = useRef()
  const datereadInputRef = useRef()

  const createBook = (e) => {
    e.preventDefault()

    addBook({
      title: titleInputRef.current.value,
      author: authorInputRef.current.value,
      genre: genreInputRef.current.value,
      published: publishedInputRef.current.value,
      dateread: datereadInputRef.current.value,
    })
    titleInputRef.current.value = ''
    authorInputRef.current.value = ''
    genreInputRef.current.value = ''
    publishedInputRef.current.value = ''
    datereadInputRef.current.value = ''
  }

  return (
    <div className={classes.bookFormStyle}>
      <h2>Create a new book</h2>

      <form onSubmit={createBook}>
        <p>
          <label>title:</label>
          <input
            type='text'
            id='title'
            required
            ref={titleInputRef}
          />
        </p>
        <p>
          <label>author:</label>
          <input
            type='text'
            id='author'
            required
            ref={authorInputRef}
          />
        </p>
        <p>
          <label>genre:</label>
          <input
            type='text'
            id='genre'
            required
            ref={genreInputRef}
          />
        </p>
        <p>
          <label>published:</label>
          <input
            type='number'
            id='published'
            required
            ref={publishedInputRef}
          />
        </p>
        <p>
          <label>dateread:</label>
          <input
            type='number'
            id='dateread'
            required
            ref={datereadInputRef}
          />
        </p>

        <Button className={classes.bookFormButton} type='submit'>
          create
        </Button>
      </form>
    </div>  
  )
}

BookForm.propTypes = {
  addBook: PropTypes.func.isRequired
}

export default BookForm