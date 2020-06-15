import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import apiManager from "../api/apiManager";

const EntryForm = (props) => {
  const locations = props.locations;
  const events = props.events;
  const chosenLocation = props.chosenLocation;
  const chosenRoute = props.chosenRoute;
  const chosenEvent = props.chosenEvent;
  const handleChosenLocationChange = props.handleChosenLocationChange;
  const handleChosenEventChange = props.handleChosenEventChange;
  const [entry, setEntry] = useState({
    attendee_count: "",
    vehicle_number: "",
    user_id: 1,
  });

  entry.location_id = chosenLocation;
  entry.route_id = chosenRoute;
  entry.event_id = chosenEvent;

  const handleEntryChange = (e) => {
    const stateToChange = { ...entry };
    stateToChange[e.target.id] = e.target.value;
    setEntry(stateToChange);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const token = sessionStorage.getItem("token");
    apiManager.postEntry(entry).then(() => {
      setEntry({
        attendee_count: "",
        vehicle_number: "",
        event_id: 1,
        location_id: "",
        route_id: 1,
        user_id: 1,
      });
    });
    alert("Success!");
  };

  return (
    <>
      <div className="event-form-page">
        <h1 className="event_header">New Entry Form</h1>
        <form className="event_form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <InputLabel htmlFor="age-native-simple">Attendee Count: </InputLabel>
              <TextField
                required
                type="number"
                id="attendee_count"
                fullWidth
                onChange={handleEntryChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InputLabel htmlFor="age-native-simple">Vehicle Number: </InputLabel>
              <TextField
                required
                id="vehicle_number"
                fullWidth
                onChange={handleEntryChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InputLabel htmlFor="age-native-simple">Event: </InputLabel>
              <Select
                id="event_id"
                native
                onChange={handleChosenEventChange}
                fullWidth
                required
                value={chosenEvent}
              >
                <option aria-label="None" value="0">
                  Choose Event
                </option>
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
              <InputLabel htmlFor="age-native-simple">Location: </InputLabel>
              <Select
                id="location_id"
                native
                onChange={handleChosenLocationChange}
                fullWidth
                required
                value={chosenLocation}
              >
                <option aria-label="None" value="0">
                  Choose Location
                </option>
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
          <Grid>
            <Button onClick={handleSubmit}>Submit</Button>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default EntryForm;
