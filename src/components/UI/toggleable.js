import PropTypes from 'prop-types'
import React, { useImperativeHandle, useState } from 'react'
import classes from './toggleable.module.css'

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div className={classes.toggleableDiv}>
      <div style={showWhenVisible}>
        {props.children}
        <button className={classes.buttonHide} onClick={toggleVisibility}>
          hide
        </button>
      </div>
      <div className={classes.hideWhenVisible} style={hideWhenVisible}>
        <button className={props.className} onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
    </div>
  )
})

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Toggleable.displayName = 'Toggleable'

export default Toggleable