import React, { Fragment } from 'react';
import MainHeader from './mainheader';

const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  )
}

export default Layout;