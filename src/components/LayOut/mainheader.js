import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './mainheader.module.css';

const MainHeader = () => {
  return (
    <header>
      <ul>
        <li>
          <NavLink activeClassName={classes.active} to='/books'>
            Books
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={classes.active} to='/about'>
            About
          </NavLink>
        </li>
      </ul>
    </header>
  )
}

export default MainHeader;