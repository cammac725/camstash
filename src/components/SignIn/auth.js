import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../UI/button'
import Card from '../UI/card'
import classes from './auth.module.css'

const Auth = ({ setShowSignUp, setShowLogIn }) => {
  const history = useHistory()
  const signUpBtnHandler = () => {
    setShowSignUp(true)
    setShowLogIn(false)
    history.push('/signup')
  }
  const loginBtnHandler = () => {
    setShowLogIn(true)
    setShowSignUp(false)
    history.push('/login')
  }

  return (
    <Card className={classes.authButtons}>
      <Button onClick={signUpBtnHandler}>Sign up</Button>
      <Button onClick={loginBtnHandler}>Login</Button>
    </Card>
  )
}

Auth.propTypes = {
  setShowSignUp: PropTypes.func.isRequired,
  setShowLogIn: PropTypes.func.isRequired
}

export default Auth