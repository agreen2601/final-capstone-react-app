import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
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
  const allEntries = props.entries;

  // get entries based on location and event chosen from dropdowns then filter based on date
  const filteredEntries = allEntries
    .filter((each) => each.event_id.toString().includes(chosenEvent))
    .filter((eachRemaining) =>
      eachRemaining.place_id.toString().includes(chosenLocation)
    )
    .filter((eachStillRemaining) =>
      eachStillRemaining.date.includes(chosenDate)
    );

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
              <option aria-label="None" value="">
                All Events
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
            <InputLabel>Location:</InputLabel>
            <Select
              id="placeId"
              native
              onChange={handleChosenLocationChange}
              fullWidth
              required
              label="??"
              value={chosenLocation}
            >
              <option aria-label="None" value="">
                All Locations
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
                All Dates
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
        <RouteGraph filteredEntries={filteredEntries} {...props} />
        <TestGraph filteredEntries={filteredEntries} {...props} />
      </div>
    </>
  );
};

export default RouteReport;
