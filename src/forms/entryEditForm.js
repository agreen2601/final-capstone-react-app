import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import apiManager from "../api/apiManager";

// "locations" and "events" fill the dropdowns, both "handle...change"s change the 3 "chosen"s (route dependent upon location work together)
const EntryEditForm = (props) => {
  const events = props.events;
  const locations = props.locations;
  const routes = props.routes;
  // const chosenLocation = props.chosenLocation;
  // const chosenRoute = props.chosenRoute;
  // const chosenEvent = props.chosenEvent;
  // const chosenDate = props.chosenDate;
  // const handleChosenEventChange = props.handleChosenEventChange;
  // const handleChosenLocationChange = props.handleChosenLocationChange;
  const handleChosenRouteChange = props.handleChosenRouteChange;
  // const handleChosenDateChange = props.handleChosenDateChange
  const [entry, setEntry] = useState({
    event_id: "",
    place_id: "",
    attendee_count: "",
    vehicle_number: "",
    date: "",
    time: "",
  });

  // set values for entry from state from dropdowns, which carry over from form to log and back without changing until user chooses new
  // entry.place_id = chosenLocation;
  // entry.route_id = chosenRoute;
  // entry.event_id = chosenEvent;
  // entry.date = chosenDate;

  // update state of entry upon form field change
  const handleEntryChange = (e) => {
    const stateToChange = { ...entry };
    stateToChange[e.target.id] = e.target.value;
    setEntry(stateToChange);
  };

  useEffect(() => {
    apiManager
      .getSingleType("entries", props.match.params.entryId)
      .then((entry) => {
        setEntry(entry);
      });
  }, [props.match.params.entryId]);

  const editedEntry = {
    id: props.match.params.entryId,
    event_id: entry.event_id,
    place_id: entry.place_id,
    date: entry.date,
    attendee_count: entry.attendee_count,
    vehicle_number: entry.vehicle_number,
    time: entry.time,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiManager.updateEntry(editedEntry).then(() => {
      props.history.push("/location/log");
    });
  };

  return (
    <>
      <div className="event-form-page">
        <Typography component="h1" variant="h5" className="page-header">
          Edit Entry
        </Typography>
        <form className="drop-downs" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <InputLabel>Event:</InputLabel>
              <Select
                id="event_id"
                native
                onChange={handleEntryChange}
                fullWidth
                required
                value={entry.event_id}
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
              <InputLabel>Route:</InputLabel>
              <Select
                id="routeId"
                native
                onChange={handleChosenRouteChange}
                fullWidth
                // value={routeVal}
              >
                <option aria-label="None" value="">
                  Choose Route
                </option>
                {routes ? (
                  routes.map((route) => (
                    <option key={route.id} value={route.name}>
                      {route.name} {route.description}
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
                id="place_id"
                native
                onChange={handleEntryChange}
                fullWidth
                required
                value={entry.place_id}
              >
                <option aria-label="None" value="">
                  Choose Location
                </option>
                {locations ? (
                  locations.map((place) => (
                    <option key={place.id} value={parseInt(place.id)}>
                      {place.name}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </Select>
            </Grid>
            <Grid item xs={12} md={3}>
              <InputLabel htmlFor="age-native-simple">Date: </InputLabel>
              <TextField
                id="date"
                type="date"
                fullWidth
                value={entry.date}
                onChange={handleEntryChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InputLabel htmlFor="age-native-simple">Time: </InputLabel>
              <TextField
                id="time"
                type="time"
                fullWidth
                value={entry.time}
                onChange={handleEntryChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InputLabel htmlFor="age-native-simple">
                Attendee Count:{" "}
              </InputLabel>
              <TextField
                required
                type="number"
                id="attendee_count"
                fullWidth
                onChange={handleEntryChange}
                value={entry.attendee_count}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InputLabel htmlFor="age-native-simple">
                Vehicle Number:{" "}
              </InputLabel>
              <TextField
                id="vehicle_number"
                fullWidth
                value={entry.vehicle_number}
                onChange={handleEntryChange}
              />
            </Grid>
          </Grid>
          <Grid>
            <div className="submit-button">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default EntryEditForm;
