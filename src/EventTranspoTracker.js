import React, { useState, useEffect } from "react";
import { BrowserRouter, useHistory, Route } from "react-router-dom";
import Nav_Bar from "./Navbar";
import EntryForm from "./forms/EntryForm";
import apiManager from "./api/apiManager";
import RouteReport from "./reports/RouteReport";
import LocationLog from "./logs/LocationLog";

const EventTranspoTracker = () => {
  let history = useHistory();
  const isAuthenticated = () => sessionStorage.getItem("token") !== null;
  const [hasUser, setHasUser] = useState(isAuthenticated());
  const [userInfo, setUserInfo] = useState({});

  const setUserToken = (resp) => {
    sessionStorage.setItem("token", resp.token);
    setHasUser(isAuthenticated());
  };

  const clearUser = () => {
    sessionStorage.clear();
    setHasUser(isAuthenticated());
  };

  // locations is all locations to fill the dropdown menus on the form and log
  // chosenLocation is the choice made from the dropdown
  // chosenRoute is dependent upon chosen location (fetch location info with locationId then .route_id)
  // chosenEvent is the choice made from the dropdown
  const [locations, setLocations] = useState([]);
  const [events, setEvents] = useState([]);
  const [entries, setEntries] = useState([]);
  const [chosenLocation, setChosenLocation] = useState(1);
  const [chosenRoute, setChosenRoute] = useState("");
  const [chosenEvent, setChosenEvent] = useState(1);
  const [chosenDate, setChosenDate] = useState(1);

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

  // get and sort in chronological order all dates for the dropdown menus
  const getEntries = () => {
    apiManager.getAllEntries().then((r) => {
      setEntries(r);
    });
  };

  const uniqueDates = [...new Set(entries.map(entry => entry.date))]
  console.log("unique dates", uniqueDates)

  // set chosenDate based on choice from dropdown menu
  const handleChosenDateChange = (e) => {
    const dateId = parseInt(e.target.value);
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
      <Nav_Bar />
      <Route
        exact
        path="/entry/form"
        render={(props) => (
          <EntryForm
            locations={locations}
            events={events}
            chosenLocation={chosenLocation}
            chosenRoute={chosenRoute}
            chosenEvent={chosenEvent}
            handleChosenLocationChange={handleChosenLocationChange}
            handleChosenEventChange={handleChosenEventChange}
            {...props}
          />
        )}
      />
      <Route
        exact
        path="/location/log"
        render={(props) => (
          <LocationLog
            locations={locations}
            events={events}
            chosenLocation={chosenLocation}
            chosenEvent={chosenEvent}
            handleChosenLocationChange={handleChosenLocationChange}
            handleChosenEventChange={handleChosenEventChange}
            {...props}
          />
        )}
      />
      <Route
        exact
        path="/route/report"
        render={(props) => (
          <RouteReport
            locations={locations}
            events={events}
            chosenLocation={chosenLocation}
            chosenRoute={chosenRoute}
            chosenEvent={chosenEvent}
            handleChosenLocationChange={handleChosenLocationChange}
            handleChosenEventChange={handleChosenEventChange}
            {...props}
          />
        )}
      />
    </BrowserRouter>
  );
};

export default EventTranspoTracker;
