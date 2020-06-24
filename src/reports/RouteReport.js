import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import apiManager from "../api/apiManager";
import RouteGraph from "./routeGraph";
import TestGraph from "./testGraph";

const RouteReport = (props) => {
  const locations = props.locations;
  const events = props.events;
  const dates = props.uniqueDates;
  const chosenLocation = props.chosenLocation;
  const chosenEvent = props.chosenEvent;
  const chosenDate = props.chosenDate;
  const handleChosenLocationChange = props.handleChosenLocationChange;
  const handleChosenEventChange = props.handleChosenEventChange;
  const handleChosenDateChange = props.handleChosenDateChange;
  const [entries, setEntries] = useState([]);

  // get entries based on location and event chosen from dropdowns then filter based on date
  const getEntries = (locationId, eventId) => {
    apiManager.getEntriesByLocationAndEvent(locationId, eventId).then((r) => {
      setEntries(r);
    });
  };
  const entriesByDate = entries
    .filter((entry) => entry.date.includes(chosenDate))
    .sort((a, b) => a.time.localeCompare(b.time));

  useEffect(() => {
    getEntries(props.chosenLocation, props.chosenEvent);
  }, [props.chosenLocation, props.chosenEvent]);

  return (
    <>
      <div>
        <Typography component="h1" variant="h5">
          Route Reports
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <InputLabel>Event:</InputLabel>
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
            <InputLabel>Location:</InputLabel>
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
          <Grid item xs={12} md={3}>
            <InputLabel>Date:</InputLabel>
            <Select
              id="dateId"
              native
              onChange={handleChosenDateChange}
              fullWidth
              required
              label="??"
              value={chosenDate}
            >
              <option aria-label="None" value="">
                Choose Date
              </option>
              {dates ? (
                dates.map((date) => (
                  <option key={date} value={date}>
                    {date}
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
        <RouteGraph entriesByDate={entriesByDate} {...props} />
        <TestGraph entriesByDate={entriesByDate} {...props} />
      </div>
    </>
  );
};

export default RouteReport;
