import React from "react";
import { Navbar } from "reactstrap";
import { Link } from "react-router-dom";
import BarChartIcon from "@material-ui/icons/BarChart";
import ListIcon from "@material-ui/icons/List";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const NavBar = (props) => {
  const hasUser = props.hasUser;
  const clearUser = props.clearUser;

  return (
    <>
      {hasUser ? (
        <>
          <span className="nav-header">Event Transpo Tracker</span>
          <Navbar align="right">
            <span className="nav-icon">
              <Link to="/entry/form">
                <PlaylistAddIcon style={{ fontSize: 30 }} color="action" />
              </Link>
            </span>
            <span className="nav-icon">
              <Link to="/location/log">
                <ListIcon style={{ fontSize: 30 }} color="action" />
              </Link>
            </span>
            <span className="nav-icon">
              <Link to="/route/report">
                <BarChartIcon style={{ fontSize: 30 }} color="action" />
              </Link>
            </span>
            <span className="nav-icon">
              <Link to="/login" onClick={clearUser}>
                <ExitToAppIcon style={{ fontSize: 30 }} color="action" />
              </Link>
            </span>
          </Navbar>
        </>
      ) : null}
    </>
  );
};

export default NavBar;
