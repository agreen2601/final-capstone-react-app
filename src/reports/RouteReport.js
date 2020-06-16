import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import apiManager from "../api/apiManager";
import RouteGraph from "./RouteGraph";

const RouteReport = (props) => {
  const locations = props.locations;
  const events = props.events;
  const chosenLocation = props.chosenLocation;
  const chosenEvent = props.chosenEvent;
  const handleChosenLocationChange = props.handleChosenLocationChange;
  const handleChosenEventChange = props.handleChosenEventChange;
  const [entries, setEntries] = useState([]);

  // get entries based on location and event chosen from dropdowns
  const getEntries = (locationId, eventId) => {
    apiManager.getEntriesByLocationAndEvent(locationId, eventId).then((r) => {
      setEntries(r);
    });
  };

  useEffect(() => {
    getEntries(props.chosenLocation, props.chosenEvent);
  }, [props.chosenLocation, props.chosenEvent]);

  return (
    <>
      <div>
        <h1 className="event_header">Route Reports</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <InputLabel>Select Event:</InputLabel>
            <Select
              id="eventId"
              native
              onChange={handleChosenEventChange}
              fullWidth
              required
              label="??"
              value={chosenEvent}
            >
              {events ? (
                events.map((event) => (
                  <option key={event.id} value={parseInt(event.id)}>
                    {event.name}
                  </option>
                ))
              ) : (
                <></>
              )}
            </Select>
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel>Select Location:</InputLabel>
            <Select
              id="locationId"
              native
              onChange={handleChosenLocationChange}
              fullWidth
              required
              label="??"
              value={chosenLocation}
            >
              {locations ? (
                locations.map((location) => (
                  <option key={location.id} value={parseInt(location.id)}>
                    {location.name}
                  </option>
                ))
              ) : (
                <></>
              )}
            </Select>
          </Grid>
        </Grid>
      </div>
      <div className="location_log_header"></div>
      <div>
        <RouteGraph entries={entries} {...props} />
      </div>
    </>
  );
};

export default RouteReport;
