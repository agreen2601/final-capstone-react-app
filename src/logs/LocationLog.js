import React, { useState, useEffect } from "react";
import EntryCard from "./entryCard";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import apiManager from "../api/apiManager";

const LocationLog = (props) => {
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

  //  get token for authentication
  let token = window.sessionStorage.getItem("token");

  // get entries based on location and event chosen from dropdowns then filter based on date
  const getEntries = (locationId, eventId) => {
    apiManager.getEntriesByLocationAndEvent(locationId, eventId).then((r) => {
      setEntries(r);
    });
  };
  const entriesByDate = entries.filter((entry) =>
    entry.date.includes(chosenDate)
  );

  let totalAttendeeCount = 0;
  if (entriesByDate.length !== 0) {
    totalAttendeeCount = entriesByDate
      .map((entry) => entry.attendee_count)
      .reduce((accumulator, runningTotal) => accumulator + runningTotal);
  }

  const deleteThisEntry = (id, locationId, eventId) => {
    apiManager.deleteEntry(id).then(() => {
      getEntries(props.chosenLocation, props.chosenEvent);
    });
  };

  useEffect(() => {
    getEntries(props.chosenLocation, props.chosenEvent);
  }, [props.chosenLocation, props.chosenEvent]);

  let routeName = "";
  let routeDescription = "";
  let routeColor = "";
  if (entries.length !== 0) {
    routeName = entries[0].location.route.name;
    routeDescription = entries[0].location.route.description;
    routeColor = entries[0].location.route.color;
  }

  const routeStyle = {
    color: routeColor,
  };

  return (
    <>
      <div>
        <Typography component="h1" variant="h5">
          Location Logs
        </Typography>
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
          <Grid item xs={12} md={3}>
            <InputLabel>Select Date:</InputLabel>
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
      <div style={routeStyle}>
        Route {routeName} {routeDescription}
      </div>
      <div>
        {totalAttendeeCount} attendees moved in {entriesByDate.length} trips
      </div>
      <div>
        <span>Time </span>
        <span>Vehicle Number </span>
        <span>Attendee Count </span>
        <span>Entered By</span>
      </div>
      <div className="location_log_header"></div>
      <div>
        {entriesByDate.map((entry) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            deleteThisEntry={deleteThisEntry}
            {...props}
          />
        ))}
      </div>
    </>
  );
};

export default LocationLog;
