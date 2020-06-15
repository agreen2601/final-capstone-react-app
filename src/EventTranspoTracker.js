import React, { useState, useEffect } from "react";
import { BrowserRouter, useHistory, Route } from "react-router-dom";
import Nav_Bar from "./Navbar";
import EntryForm from "./forms/EntryForm";
import LocationLog from "./LocationLog";
import apiManager from "./api/apiManager";

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
  const [chosenLocation, setChosenLocation] = useState(1);
  const [chosenRoute, setChosenRoute] = useState("");
  const [chosenEvent, setChosenEvent] = useState(1);

  // get all locations for the dropdown menus and pass them to the form and the log
  const getLocations = () => {
    apiManager.getAllLocations().then((r) => {
      setLocations(r);
    });
  };

  // get all events for the dropdown menus
  const getEvents = () => {
    apiManager.getAllEvents().then((r) => {
      setEvents(r);
    });
  };

  // set choseLocation based on choice from dropdown menu on either form or log
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

  // set chosenEvent based on choice from dropdown menu
  const handleChosenEventChange = (e) => {
    const eventId = parseInt(e.target.value);
    setChosenEvent(eventId);
  };

  // watch from change in chosenlocation and update chosenroute at the same time
  useEffect(() => {
    getLocations();
    getEvents();
    getRouteByLocation(chosenLocation);
  }, [chosenLocation]);

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
    </BrowserRouter>
  );
};

export default EventTranspoTracker;
