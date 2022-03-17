import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../UI/button'
import Card from '../UI/card'
import classes from './logout.module.css'

const LogoutUser = ({ user, logout }) => {
  const history = useHistory()

  const handleLogout = () => {
    logout()
    history.push('/auth')
  }

  return (
    <React.Fragment>
      {user !== null ? (
        <Card>
          <div className={classes.logoutUser}>
            User {user.username} is currently logged in.
          </div>
          <div className={classes.logoutButton}>
            <Button onClick={handleLogout}>Log out</Button>
          </div>
        </Card>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  )
}

LogoutUser.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
}

export default LogoutUser