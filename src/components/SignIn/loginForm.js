import PropTypes from 'prop-types'
import React, { useState } from 'react'
import validator from 'validator'
import Button from '../UI/button'
import Card from '../UI/card'
import classes from './loginForm.module.css'

const LoginForm = ({ handleLogin, showSignUp, setErrorMessage }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = (e) => {
    e.preventDefault()

    if (showSignUp && username.trim().length < 3) {
      setErrorMessage('Username must be at least 3 characters long.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else if (showSignUp && email.trim().length < 3) {
      setErrorMessage('Email must be at least 3 characters long')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else if (
        showSignUp &&
        !validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
    ) {
      setErrorMessage(
        'Password must be at least 8 characters long and have at least: 1 lowercase, 1 uppercase, 1 number, and 1 symbol.'
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    } else {
        handleLogin({
          username: username,
          email: email,
          password: password,
        })
        setEmail('')
        setUsername('')
        setPassword('')
    }
  }

  return (
    <Card className={classes.authButtons}>
      <form onSubmit={handleSignIn} className={classes.authForm}>
        {showSignUp ? (
          <p>
            <label className={classes.loginLabel}>
              email:
              <input 
                className={classes.loginformInput}
                type='email'
                value={email}
                name='email'
                placeholder='Your email...'
                maxLength='40'
                onChange={({ target }) => setEmail(target.value)}
              />
            </label>
          </p>
        ) : (
          <></>
        )}
        <p>
          <label className={classes.loginLabel}>
            username:
            <input
              className={classes.loginformInput}
              type='text'
              value={username}
              name='Username'
              placeholder='Your name...'
              maxLength='14'
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </p>
        <p>
          <label className={classes.loginLabel}>
            password:
            <input
              className={classes.loginformInput}
              type='password'
              value={password}
              name='Password'
              placeholder='Your password...'
              maxLength='50'
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </p>
        <p>
          <Button type='submit'>
            {showSignUp ? 'Sign up' : 'login'}
          </Button>
        </p>
      </form>
    </Card>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  showSignUp: PropTypes.func.isRequired,
}

export default LoginForm