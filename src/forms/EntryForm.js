import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import apiManager from "../api/apiManager";
import moment from "moment";

// "locations" and "events" fill the dropdowns, both "handle...change"s change the 3 "chosen"s (route dependent upon location work together)
const EntryForm = (props) => {
  const locations = props.locations;
  const events = props.events;
  const chosenLocation = props.chosenLocation;
  const chosenRoute = props.chosenRoute;
  const chosenEvent = props.chosenEvent;
  const chosenDate = props.chosenDate;
  const handleChosenLocationChange = props.handleChosenLocationChange;
  const handleChosenEventChange = props.handleChosenEventChange;
  const handleChosenDateChange = props.handleChosenDateChange
  const [entry, setEntry] = useState({
    attendee_count: "",
    vehicle_number: "",
  });

  // set values for entry from state from dropdowns, which carry over from form to log and back without changing until user chooses new
  entry.location_id = chosenLocation;
  entry.route_id = chosenRoute;
  entry.event_id = chosenEvent;
  entry.date = chosenDate;

  // update state of entry upon form field change
  const handleEntryChange = (e) => {
    const stateToChange = { ...entry };
    stateToChange[e.target.id] = e.target.value;
    setEntry(stateToChange);
  };

  // post entry, reset attendee count and vehicle number to empty "", provide user "success" alert
  const handleSubmit = (e) => {
    e.preventDefault();
    entry.date = moment().format("YYYY-MM-DD");
    entry.time = moment().format("H:m");
    setTimeout(() => {
      apiManager.postEntry(entry).then(() => {
        document.getElementById("attendee_count").value = "";
        document.getElementById("vehicle_number").value = "";
        setEntry({
          attendee_count: "",
          vehicle_number: "",
        });
      });
    }, 100);
    alert("Success!");
  };

  return (
    <>
      <div className="event-form-page">
        <Typography component="h1" variant="h5">
          Entry Form
        </Typography>
        <form className="event_form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <InputLabel>Event:</InputLabel>
              <Select
                id="event_id"
                native
                onChange={handleChosenEventChange}
                fullWidth
                required
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
                id="location_id"
                native
                onChange={handleChosenLocationChange}
                fullWidth
                required
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
              <InputLabel htmlFor="age-native-simple">
                Attendee Count:{" "}
              </InputLabel>
              <TextField
                required
                type="number"
                id="attendee_count"
                fullWidth
                onChange={handleEntryChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InputLabel htmlFor="age-native-simple">
                Vehicle Number:{" "}
              </InputLabel>
              <TextField
                id="vehicle_number"
                fullWidth
                onChange={handleEntryChange}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          {/* <Typography component="h1" variant="h6">
          Not Live? Only edit the date and time below if it is NOT live.
        </Typography>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Date: </InputLabel>
            <TextField
              id="date"
              type="date"
              fullWidth
              value={chosenDate}
              onChange={handleChosenDateChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel htmlFor="age-native-simple">Time: </InputLabel>
            <TextField
              id="time"
              type="time"
              fullWidth
              // value={moment().format("H:m")}
              onChange={handleEntryChange}
            />
          </Grid> */}
        </form>
      </div>
    </>
  );
};

export default EntryForm;
