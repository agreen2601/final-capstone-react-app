import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import NavBar from "./navbar";
import EntryForm from "./forms/entryForm";
import apiManager from "./api/apiManager";
import RouteReport from "./reports/routeReport";
import LocationLog from "./logs/locationLog";
import Login from "./auth/login";
import Register from "./auth/register";
import TestLog from "./logs/testLog";
import moment from "moment";

const EventTranspoTracker = () => {
  const isAuthenticated = () => sessionStorage.getItem("token") !== null;
  const [hasUser, setHasUser] = useState(isAuthenticated());

  const setUserToken = (resp) => {
    sessionStorage.setItem("token", resp.token);
    setHasUser(isAuthenticated());
  };

  const clearUser = () => {
    sessionStorage.clear();
    setHasUser(isAuthenticated());
  };

  // locations and events are all locations and events to fill the dropdown menus
  // chosenLocation and chosenEvent are the choices made from the dropdowns
  // chosenRoute is dependent upon chosen location (fetch location info with locationId then access .route_id)
  const [locations, setLocations] = useState([]);
  const [events, setEvents] = useState([]);
  const [entries, setEntries] = useState([]);
  const [chosenLocation, setChosenLocation] = useState(1);
  const [chosenRoute, setChosenRoute] = useState("");
  const [chosenEvent, setChosenEvent] = useState(1);
  const [chosenDate, setChosenDate] = useState(moment().format("YYYY-MM-DD"));

  // get and sort in alpha order all locations for the dropdown menus and pass them to the form and the log
  const getLocations = () => {
    apiManager.getAllLocations().then((r) => {
      r.sort((a, b) => a.name.localeCompare(b.name));
      setLocations(r);
    });
  };

  // set choseLocation based on choice from dropdown menu on form and log
  const handleChosenLocationChange = (e) => {
    const locationId = parseInt(e.target.value);
    setChosenLocation(locationId);
  };

  // set chosenRoute based on chosenLocation and pass it down to the form
  const getRouteByLocation = (locationId) => {
    apiManager.getSingleLocation(locationId).then((r) => {
      setChosenRoute(r.route_id);
    });
  };

  // get and sort in alpha order all events for the dropdown menus
  const getEvents = () => {
    apiManager.getAllEvents().then((r) => {
      r.sort((a, b) => a.name.localeCompare(b.name));
      setEvents(r);
    });
  };

  // set chosenEvent based on choice from dropdown menu
  const handleChosenEventChange = (e) => {
    const eventId = parseInt(e.target.value);
    setChosenEvent(eventId);
  };

  // get all entries then find unique dates for the dropdown menus
  const getEntries = () => {
    apiManager.getAllEntries().then((r) => {
      setEntries(r);
    });
  };
  const uniqueDates = [...new Set(entries.map((entry) => entry.date))];

  // set chosenDate based on choice from dropdown menu
  const handleChosenDateChange = (e) => {
    const dateId = e.target.value;
    setChosenDate(dateId);
  };

  // watch from change in chosenlocation and update chosenroute at the same time
  useEffect(() => {
    getLocations();
    getEvents();
    getEntries();
    getRouteByLocation(chosenLocation);
  }, [chosenLocation, chosenEvent]);

  return (
    <BrowserRouter>
      <NavBar
        navArray={
          hasUser
            ? [
                { title: "Make Entry", route: "/entry/form" },
                { title: "Logs", route: "/location/log" },
                { title: "Reports", route: "/route/reports" },
              ]
            : []
        }
        hasUser={hasUser}
        clearUser={clearUser}
      />
      <Route
        exact
        path="/login"
        render={(props) => <Login setUserToken={setUserToken} {...props} />}
      />
      <Route
        exact
        path="/register"
        render={(props) => <Register setUserToken={setUserToken} {...props} />}
      />
      <Route
        exact
        path="/entry/form"
        render={(props) =>
          hasUser ? (
            <EntryForm
              hasUser={hasUser}
              clearUser={clearUser}
              locations={locations}
              events={events}
              entries={entries}
              uniqueDates={uniqueDates}
              chosenLocation={chosenLocation}
              chosenRoute={chosenRoute}
              chosenEvent={chosenEvent}
              chosenDate={chosenDate}
              getEntries={getEntries}
              handleChosenLocationChange={handleChosenLocationChange}
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
              hasUser={hasUser}
              clearUser={clearUser}
              locations={locations}
              events={events}
              entries={entries}
              uniqueDates={uniqueDates}
              chosenLocation={chosenLocation}
              chosenRoute={chosenRoute}
              chosenEvent={chosenEvent}
              chosenDate={chosenDate}
              handleChosenLocationChange={handleChosenLocationChange}
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
              hasUser={hasUser}
              clearUser={clearUser}
              locations={locations}
              events={events}
              entries={entries}
              uniqueDates={uniqueDates}
              chosenLocation={chosenLocation}
              chosenRoute={chosenRoute}
              chosenEvent={chosenEvent}
              chosenDate={chosenDate}
              handleChosenLocationChange={handleChosenLocationChange}
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
        path="/test/log"
        render={(props) => <TestLog {...props} />}
      />
    </BrowserRouter>
  );
};

export default EventTranspoTracker;
