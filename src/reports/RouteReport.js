import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import RouteGraph from "./routeGraph"

const RouteReport = (props) => {
  const locations = props.locations;
  const routes = props.routes;
  const events = props.events;
  const dates = props.uniqueDates;
  const chosenLocation = props.chosenLocation;
  const chosenRoute = props.chosenRoute;
  const chosenEvent = props.chosenEvent;
  const chosenDate = props.chosenDate;
  const handleChosenLocationChange = props.handleChosenLocationChange;
  const handleChosenRouteChange = props.handleChosenRouteChange;
  const handleChosenEventChange = props.handleChosenEventChange;
  const handleChosenDateChange = props.handleChosenDateChange;
  const allEntries = props.entries;

  // get entries based on location and event chosen from dropdowns then filter based on date
  const filteredEntries = allEntries
    .filter((each1) => each1.event_id.toString().includes(chosenEvent))
    .filter((each2) => each2.place_id.toString().includes(chosenLocation))
    .filter((each3) => each3.place.route.name.includes(chosenRoute))
    .filter((each4) => each4.date.includes(chosenDate))
    .sort((a, b) => a.time.localeCompare(b.time))
    .sort((a, b) => a.date.localeCompare(b.date));

  let totalAttendeeCount = 0;
  if (filteredEntries.length !== 0) {
    totalAttendeeCount = filteredEntries
      .map((entry) => entry.attendee_count)
      .reduce((accumulator, runningTotal) => accumulator + runningTotal);
  }

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
            <InputLabel>Route:</InputLabel>
            <Select
              id="routeId"
              native
              onChange={handleChosenRouteChange}
              fullWidth
              required
              value={chosenRoute}
            >
              <option aria-label="None" value="">
                All Routes
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
        <Typography variant="h6">
          {totalAttendeeCount} attendees moved in {filteredEntries.length}{" "}
          trips.
        </Typography>
      <div>
        <RouteGraph filteredEntries={filteredEntries} {...props} />
        {/* <TestGraph filteredEntries={filteredEntries} {...props} /> */}
        {/* <TestA filteredEntries={filteredEntries} {...props} /> */}
      </div>
    </>
  );
};

export default RouteReport;
