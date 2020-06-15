import React from "react";
import {
  Navbar
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";

const Nav_Bar = (props) => {
  return (
    <>
      <Navbar>
        <Link to="/entry/form">Entry Form</Link>{" "}
        <Link to="/location/log">Location Logs</Link>
      </Navbar>
    </>
  );
};

export default Nav_Bar;
