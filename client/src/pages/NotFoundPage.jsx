import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <h1>404 Not found - <Link to="/">Go Home</Link></h1>
    </>
  )
}

export default NotFoundPage;