import React from "react";
import { Navbar } from "reactstrap";
import { Link } from "react-router-dom";
import BarChartIcon from "@material-ui/icons/BarChart";
import ListIcon from "@material-ui/icons/List";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";

const NavBar = (props) => {
  const hasUser = props.hasUser;
  const clearUser = props.clearUser;

  return (
    <>
      <Navbar>
        {hasUser ? (
          <Link to="/entry/form">
            <PlaylistAddIcon style={{ fontSize: 30 }} color="action" />
          </Link>
        ) : null}
        {hasUser ? (
          <Link to="/location/log">
            <ListIcon style={{ fontSize: 30 }} color="action" />
          </Link>
        ) : null}
        {hasUser ? (
          <Link to="/route/report">
            <BarChartIcon style={{ fontSize: 30 }} color="action" />
          </Link>
        ) : null}
        {hasUser ? (
          <Link to="/" onClick={clearUser}>
            <ExitToAppIcon style={{ fontSize: 30 }} color="action" />
          </Link>
        ) : null}
      </Navbar>
    </>
  );
};

export default NavBar;
