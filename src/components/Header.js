import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Cam Stash</h1>
      <hr />
      <div className='links'>
        <NavLink to="/" className="link active" exact="true">
          Books List
        </NavLink>
        <NavLink to="/add" className="link active">
          Add Book
        </NavLink>
      </div>
    </header>
  );
};

export default Header;