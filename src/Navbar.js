import React from "react";
import { Navbar } from "reactstrap";
import { Link } from "react-router-dom";

const Nav_Bar = (props) => {
  return (
    <>
      <Navbar>
        <Link to="/entry/form">Entry Form</Link>{" "}
        <Link to="/location/log">Location Logs</Link>{" "}
        <Link to="/route/report">Route Report</Link>
      </Navbar>
    </>
  );
};

export default Nav_Bar;
