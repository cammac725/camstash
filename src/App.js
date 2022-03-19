import React, { useEffect, useRef, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Book from './components/Books/book'
import BookForm from './components/Books/bookForm'
import BookHeader from './components/Books/bookHeader'
import SortBooks from './components/Books/sortBooks'
import About from './components/LayOut/about'
import Layout from './components/LayOut/layout'
import ErrorMessage from './components/Messages/errorMessage'
import SuccessMessage from './components/Messages/successMessage'
import Toggleable from './components/UI/toggleable'
import * as bookService from './services/books'

const App = () => {
  const [books, setBooks] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [loading, setLoading] = useState(true)

  const bookFormRef = useRef()

  useEffect(() => {
    bookService
      .getAll()
      .then((books) => setBooks(books))
      .then(setLoading(false))
      .catch((error) => {
        setLoading(true)
        console.error('Error on loading books:', error)
      })
  }, [])

  const sortArray = (type) => {
    const sortTypes = {
      title: 'title',
      author: 'author',
      genre: 'genre',
    }
    const sortWith = sortTypes[type]
    let sorted

    try {
      sorted = [...books].sort((a,b) => 
        a[sortWith]
          .toLowerCase()
          .localeCompare(b[sortWith].toLowerCase())
      )
      setBooks(sorted)
    } catch (exception) {
        console.log('exception', exception.message)
        setErrorMessage('Error on sorting books')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  }

  const addBook = async (bookObject) => {
    bookFormRef.current.toggleVisibility()

    try {
      const waitBooks = await bookService.create(bookObject)

      setBooks(books.concat(waitBooks))
      setSuccessMessage(
        `A new book ${waitBooks.title} by ${waitBooks.author} added`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
        console.log('exception', exception.message)
        setErrorMessage('You cannot add a book')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  }

  const deleteBook = async (delId) => {
    const id = delId
    const copyOfBooks = [...books]
    const findBook = { ...copyOfBooks.find((a) => a.id === delId) }
    const filterById = copyOfBooks.filter((b) => b.id !== id)

    if (window.confirm(`Delete book ${findBook.title} ?`)) {
      try {
        await bookService.remove(id)
        setBooks(filterById)
        setSuccessMessage('The book was successfully deleted')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      } catch (exception) {
        console.log('delete error:', exception.message)
        setErrorMessage(
          "You can't remove a book that hasn't been added.",
          exception
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  return (
    <Layout>
      <SuccessMessage successMessage={successMessage} />
      <ErrorMessage errorMessage={errorMessage} />
      <Switch>
        <Route path='/' exact />
        
        <Route path='/books'>
          <div className='headerNsort'>
            <BookHeader />
            <SortBooks sortArray={sortArray} />
          </div>
          <Toggleable
            buttonLabel='Add a book'
            ref={bookFormRef}
            className='hideWhenVisible'
          >
            <BookForm addBook={addBook} />
          </Toggleable>

          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <React.Fragment>
              {books.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  Toogleable={Toggleable}
                  deleteBook={deleteBook}
                  loading={loading}
                />
              ))}
            </React.Fragment>
          )}
        </Route>
        <Route path='/about'>
          <About />
        </Route>
      </Switch>
    </Layout>
  )
}
 
export default App;