import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import NavBar from "./navbar";
import EntryForm from "./forms/entryForm";
import EntryEditForm from "./forms/entryEditForm";
import apiManager from "./api/apiManager";
import RouteReport from "./reports/routeReport";
import LocationLog from "./logs/locationLog";
import Login from "./auth/login";
import Register from "./auth/register";
import "./styles.css";

const EventTranspoTracker = () => {
  const isAuthenticated = () => sessionStorage.getItem("token") !== null;
  const [hasUser, setHasUser] = useState(isAuthenticated());

  const setUserToken = (resp) => {
    sessionStorage.setItem("token", resp.token);
    sessionStorage.setItem("userID", resp.user_id);
    setHasUser(isAuthenticated());
  };

  const clearUser = () => {
    sessionStorage.clear();
    setHasUser(isAuthenticated());
  };

  // locations routes and events fill the dropdown menus
  // locations filter based on chosenRoute
  // chosenLocation chosenRoute and chosenEvent are the choices made from the dropdowns
  const [locations, setLocations] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [events, setEvents] = useState([]);
  const [entries, setEntries] = useState([]);
  const [chosenLocationId, setChosenLocationId] = useState("");
  const [chosenLocationName, setChosenLocationName] = useState("");
  const [chosenRoute, setChosenRoute] = useState("");
  const [chosenEventId, setChosenEventId] = useState("");
  const [chosenEventName, setChosenEventName] = useState("");
  const [chosenDate, setChosenDate] = useState("");

  // get and sort in alpha order all locations for the dropdown menus
  const getLocations = () => {
    apiManager.getAllType("places").then((r) => {
      r.sort((a, b) => a.name.localeCompare(b.name));
      setLocations(r);
    });
  };

  // set choseLocation based on choice from dropdown menu
  const handleChosenLocationChange = (e) => {
    setChosenLocationId(e.target.value);
    setChosenLocationName(e.target.options[e.target.selectedIndex].dataset.name);
    if (e.target.value !== "") {
      // apiManager.getSingleType("places", placeId).then((r) => {
      //   apiManager.getSingleType("routes", r.route_id).then((re) => {
      //     // setRoutes([re]);
      //     // setChosenRoute(re.name)
      //   });
      // });
    } else {
      getRoutes();
    }
  };

  // // get and sort in alpha order all routes for the dropdown menus and pass them to the form log and graph
  const getRoutes = () => {
    apiManager.getAllType("routes").then((r) => {
      r.sort((a, b) => a.name.localeCompare(b.name));
      setRoutes(r);
    });
  };

  // // set choseroute based on choice from dropdown menu on form log and graph
  const handleChosenRouteChange = (e) => {
    const routeId = e.target.value;
    setChosenRoute(routeId);
    setChosenLocationId("");
    setChosenLocationName("");
    apiManager.getAllType("places").then((r) => {
      if (routeId !== "") {
        setLocations(
          r
            .filter((each) => each.route.name === routeId)
            .sort((a, b) => a.name.localeCompare(b.name))
        );
      } else {
        setLocations(r.sort((a, b) => a.name.localeCompare(b.name)));
      }
    });
  };

  // get and sort in alpha order all events for the dropdown menus
  const getEvents = () => {
    apiManager.getAllType("events").then((r) => {
      r.sort((a, b) => a.name.localeCompare(b.name));
      setEvents(r);
    });
  };

  // set chosenEventId based on choice from dropdown menu
  const handleChosenEventChange = (e) => {
    setChosenEventId(e.target.value);
    setChosenEventName(e.target.options[e.target.selectedIndex].dataset.name);
  };

  // get all entries then find unique dates for the dropdown menus
  const getEntries = () => {
    apiManager.getAllType("entries").then((r) => {
      r.sort((a, b) => a.date.localeCompare(b.date));
      setEntries(r);
    });
  };
  const uniqueDates = [...new Set(entries.map((entry) => entry.date))];

  // set chosenDate based on choice from dropdown menu
  const handleChosenDateChange = (e) => {
    const dateId = e.target.value;
    setChosenDate(dateId);
  };

  useEffect(() => {
    getEvents();
    getEntries();
    getLocations();
    getRoutes();
  }, []);

  return (
    <BrowserRouter>
      <NavBar hasUser={hasUser} clearUser={clearUser} />
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route
        exact
        path="/login"
        render={(props) =>
          hasUser ? (
            <Redirect to="/entry/form" />
          ) : (
            <Login setUserToken={setUserToken} {...props} />
          )
        }
      />
      <Route
        exact
        path="/register"
        render={(props) =>
          hasUser ? (
            <Redirect to="/entry/form" />
          ) : (
            <Register setUserToken={setUserToken} {...props} />
          )
        }
      />
      <Route
        exact
        path="/entry/form"
        render={(props) =>
          hasUser ? (
            <EntryForm
              locations={locations}
              routes={routes}
              events={events}
              chosenLocationId={chosenLocationId}
              chosenRoute={chosenRoute}
              chosenEventId={chosenEventId}
              chosenDate={chosenDate}
              handleChosenLocationChange={handleChosenLocationChange}
              handleChosenRouteChange={handleChosenRouteChange}
              handleChosenEventChange={handleChosenEventChange}
              handleChosenDateChange={handleChosenDateChange}
              {...props}
            />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        exact
        path="/entry/edit/form/:entryId(\d+)"
        render={(props) =>
          hasUser ? (
            <EntryEditForm
              locations={locations}
              routes={routes}
              events={events}
              chosenLocationId={chosenLocationId}
              chosenRoute={chosenRoute}
              chosenEventId={chosenEventId}
              chosenDate={chosenDate}
              handleChosenLocationChange={handleChosenLocationChange}
              handleChosenRouteChange={handleChosenRouteChange}
              handleChosenEventChange={handleChosenEventChange}
              handleChosenDateChange={handleChosenDateChange}
              {...props}
            />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        exact
        path="/location/log"
        render={(props) =>
          hasUser ? (
            <LocationLog
              getEntries={getEntries}
              locations={locations}
              routes={routes}
              events={events}
              entries={entries}
              uniqueDates={uniqueDates}
              chosenLocationId={chosenLocationId}
              chosenLocationName={chosenLocationName}
              chosenRoute={chosenRoute}
              chosenEventId={chosenEventId}
              chosenEventName={chosenEventName}
              chosenDate={chosenDate}
              handleChosenLocationChange={handleChosenLocationChange}
              handleChosenRouteChange={handleChosenRouteChange}
              handleChosenEventChange={handleChosenEventChange}
              handleChosenDateChange={handleChosenDateChange}
              {...props}
            />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        exact
        path="/route/report"
        render={(props) =>
          hasUser ? (
            <RouteReport
              getEntries={getEntries}
              locations={locations}
              routes={routes}
              events={events}
              entries={entries}
              uniqueDates={uniqueDates}
              chosenLocationId={chosenLocationId}
              chosenLocationName={chosenLocationName}
              chosenRoute={chosenRoute}
              chosenEventId={chosenEventId}
              chosenEventName={chosenEventName}
              chosenDate={chosenDate}
              handleChosenLocationChange={handleChosenLocationChange}
              handleChosenRouteChange={handleChosenRouteChange}
              handleChosenEventChange={handleChosenEventChange}
              handleChosenDateChange={handleChosenDateChange}
              {...props}
            />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </BrowserRouter>
  );
};

export default EventTranspoTracker;
