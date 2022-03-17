import React from 'react'
import classes from './bookHeader.module.css'

const BookHeader = () => {
  return (
    <div className={classes.bookHeaderStyle}>
      This page contains books added by authenticated users
    </div>
  )
}

export default BookHeader