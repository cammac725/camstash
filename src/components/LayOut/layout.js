import React, { Fragment } from 'react';
import MainHeader from './mainheader';

const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.childeren}</main>
    </Fragment>
  )
}

export default Layout;