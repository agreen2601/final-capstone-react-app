import React from "react";
import { Navbar } from "reactstrap";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const hasUser = props.hasUser;
  const clearUser = props.clearUser

  return (
    <>
      <Navbar>
        {hasUser ? <Link to="/entry/form">Entry Form </Link> : null}
        {hasUser ? <Link to="/location/log">Location Logs </Link> : null}
        {hasUser ? <Link to="/route/report">Route Report </Link> : null}
        {hasUser ? <Link to="/login" onClick={clearUser}>Logout </Link> : null}
        {hasUser ? null : <Link to="/login">Login </Link>}
        {hasUser ? null : <Link to="/register">Register</Link>}
      </Navbar>
    </>
  );
};

export default NavBar;
