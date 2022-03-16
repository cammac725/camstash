import React, { useEffect, useRef, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import Layout from './components/LayOut'
import ErrorMessage from './components/Messages/errorMessage'
import SuccessMessage from './components/Messages/successMessage'
import bookService from './services/books'


const App = () => {
  const [books, setBooks] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [loading, setLoading] = useState(true);
  const history = useHistory()
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBookappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      bookService.setToken(user.token)
    }
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
        setErrorMessage('You must log in before you can add books')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  }

  return (
    <Layout>
      <SuccessMessage successMessage={successMessage} />
      <ErrorMessage errorMessage={errorMessage} />
      <div>
        <Header />
        <div className='main-content'>
        <BooksContext.Provider value={{ books, setBooks }}>
          <Switch>
            <Route component={Bookslist} path="/" exact />
            <Route component={EditBook} path="/editbook/:id" />
          </Switch>
        </BooksContext.Provider>
        </div>
      </div>
    </Layout>
  );
};

export default App;