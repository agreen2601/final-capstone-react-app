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

  // locations and events are all locations and events to fill the dropdown menus
  // chosenLocation and chosenEvent are the choices made from the dropdowns
  // chosenRoute is dependent upon chosen location (fetch location info with locationId then access .route_id)
  const [locations, setLocations] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [events, setEvents] = useState([]);
  const [entries, setEntries] = useState([]);
  const [chosenLocation, setChosenLocation] = useState("");
  const [chosenRoute, setChosenRoute] = useState("");
  const [chosenEvent, setChosenEvent] = useState("");
  const [chosenDate, setChosenDate] = useState("");

  // get and sort in alpha order all locations for the dropdown menus and pass them to the form and the log
  const getLocations = () => {
    apiManager.getAllType("places").then((r) => {
      r.sort((a, b) => a.name.localeCompare(b.name));
      setLocations(r);
    });
  };

  // set choseLocation based on choice from dropdown menu on form and log
  const handleChosenLocationChange = (e) => {
    const placeId = e.target.value;
    setChosenLocation(placeId);
    setChosenRoute("");
  };

  // // get and sort in alpha order all routes for the dropdown menus and pass them to the form and the log
  const getRoutes = () => {
    apiManager.getAllType("routes").then((r) => {
      r.sort((a, b) => a.name.localeCompare(b.name));
      setRoutes(r);
    });
  };

  // // set choseroute based on choice from dropdown menu on form and log
  const handleChosenRouteChange = (e) => {
    const routeId = e.target.value;
    setChosenRoute(routeId);
    setChosenLocation("");
  };

  // get and sort in alpha order all events for the dropdown menus
  const getEvents = () => {
    apiManager.getAllType("events").then((r) => {
      r.sort((a, b) => a.name.localeCompare(b.name));
      setEvents(r);
    });
  };

  // set chosenEvent based on choice from dropdown menu
  const handleChosenEventChange = (e) => {
    const eventId = e.target.value;
    setChosenEvent(eventId);
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

  // watch for change in chosenlocation and update chosenroute at the same time
  useEffect(() => {
    getLocations();
    getEvents();
    getEntries();
    getRoutes();
  }, []);

  return (
    <BrowserRouter>
      <NavBar hasUser={hasUser} clearUser={clearUser} />
      <Route
        exact
        path="/"
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
              locations={locations}
              events={events}
              chosenLocation={chosenLocation}
              // chosenRoute={chosenRoute}
              chosenEvent={chosenEvent}
              chosenDate={chosenDate}
              handleChosenLocationChange={handleChosenLocationChange}
              // handleChosenRouteChange={handleChosenRouteChange}
              handleChosenEventChange={handleChosenEventChange}
              handleChosenDateChange={handleChosenDateChange}
              {...props}
            />
          ) : (
            <Redirect to="/" />
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
              events={events}
              chosenLocation={chosenLocation}
              // chosenRoute={chosenRoute}
              chosenEvent={chosenEvent}
              chosenDate={chosenDate}
              handleChosenLocationChange={handleChosenLocationChange}
              handleChosenEventChange={handleChosenEventChange}
              handleChosenDateChange={handleChosenDateChange}
              {...props}
            />
          ) : (
            <Redirect to="/" />
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
              chosenLocation={chosenLocation}
              chosenRoute={chosenRoute}
              chosenEvent={chosenEvent}
              chosenDate={chosenDate}
              handleChosenLocationChange={handleChosenLocationChange}
              handleChosenRouteChange={handleChosenRouteChange}
              handleChosenEventChange={handleChosenEventChange}
              handleChosenDateChange={handleChosenDateChange}
              {...props}
            />
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        exact
        path="/route/report"
        render={(props) =>
          hasUser ? (
            <RouteReport
              locations={locations}
              routes={routes}
              events={events}
              entries={entries}
              uniqueDates={uniqueDates}
              chosenLocation={chosenLocation}
              chosenRoute={chosenRoute}
              chosenEvent={chosenEvent}
              chosenDate={chosenDate}
              handleChosenLocationChange={handleChosenLocationChange}
              handleChosenRouteChange={handleChosenRouteChange}
              handleChosenEventChange={handleChosenEventChange}
              handleChosenDateChange={handleChosenDateChange}
              {...props}
            />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    </BrowserRouter>
  );
};

export default EventTranspoTracker;
