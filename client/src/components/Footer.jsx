import React from 'react';
import {NavLink} from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <NavLink to="/about" activeClassName="is-active">About us</NavLink> &nbsp;
      <NavLink to="/contact" activeClassName="is-active">Contact</NavLink>
    </>
  )
}

export default Footer;