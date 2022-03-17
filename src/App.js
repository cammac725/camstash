import React, { useEffect, useRef, useState } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import BookForm from './components/Books/bookForm'
import BookHeader from './components/Books/bookHeader'
import SortBooks from './components/Books/sortBooks'
import Layout from './components/LayOut/layout'
import ErrorMessage from './components/Messages/errorMessage'
import SuccessMessage from './components/Messages/successMessage'
import Auth from './components/SignIn/auth'
import LoginForm from './components/SignIn/loginForm'
import Toggleable from './components/UI/toggleable'
import bookService from './services/books'
import loginService from './services/login'
import signUpService from './services/signUp'

const App = () => {
  const [books, setBooks] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [loading, setLoading] = useState(true)

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

  const logout = () => {
    window.localStorage.clear()
    bookService.setToken(null)
    setUser(null)
    setShowSignUp(false)
    setShowLogin(false)
    setSuccessMessage('Successfully logged out')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const handleLogin = async (userInfo) => {
    let user
    try {
      if (showSignUp) {
        user = await signUpService.signUP(userInfo)
      } else {
        user = await loginService.login(userInfo)
      }
      window.localStorage.setItem(
        'loggedBookappUser',
        JSON.stringify(user)
      )
      bookService.setToken(user.token)
      setUser(user)
      history.push('/books')
    } catch (exception) {
        console.log('error on login', exception.message)

        if (JSON.stringify(exception.response.data).includes('unique')) {
          setErrorMessage(
            `Username '${userInfo.username}' is already in use.`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        } else if (
            JSON.stringify(exception.response.data).includes(
              'invalid username or password'
            )
        ) {
          setErrorMessage('Invalid username or password')
          setTimeout(() => {
            setErrorMessage(null)
          },5000)
        }
    }
  }

  return (
    <Layout user={user}>
      <SuccessMessage successMessage={successMessage} />
      <ErrorMessage errorMessage={errorMessage} />
      <Switch>
        <Route path='/' exact>
          <Redirect to='/auth'></Redirect>
        </Route>
        <Route path='/auth'>
          {!showSignUp || !showLogin ? (
            <Auth
              showSignUp={showSignUp}
              setShowLogin={setShowLogin}
              setShowSignUp={setShowSignUp}
            />
          ) : (
            <></>
          )}
        </Route>
        <Route path='/login'>
          {' '}
          <LoginForm
            handleLogin={handleLogin}
            showSignUp={showSignUp}
            setErrorMessage={setErrorMessage}
          />
        </Route>
        <Route path='/signup'>
          <LoginForm
            handleLogin={handleLogin}
            showSignUp={showSignUp}
            setErrorMessage={setErrorMessage}
          />  
        </Route>
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
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;