import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/Edit";
import apiManager from "../api/apiManager";

const LocationLog = (props) => {
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
  const getEntries = props.getEntries;

  const filteredEntries = allEntries
    .filter((each) => each.event_id.toString().includes(chosenEvent))
    .filter((each2) =>
      each2.place_id.toString().includes(chosenLocation)
    )
    .filter((each3) =>
      each3.place.route.name.includes(chosenRoute)
    )
    .filter((each4) =>
      each4.date.includes(chosenDate)
    );

  let totalAttendeeCount = 0;
  if (filteredEntries.length !== 0) {
    totalAttendeeCount = filteredEntries
      .map((entry) => entry.attendee_count)
      .reduce((accumulator, runningTotal) => accumulator + runningTotal);
  }

  const deleteThisEntry = (id) => {
    const check = window.confirm(
      "Are you sure you want to delete this entry? Deletion cannot be undone."
    );
    if (check === true) {
      apiManager.deleteEntry(id).then(() => {
        getEntries();
      });
    }
  };

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <>
      <div>
        <Typography component="h1" variant="h5">
          Location Logs
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
        {totalAttendeeCount} attendees moved in {filteredEntries.length} trips.
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell align="right">Vehicle #</TableCell>
              <TableCell align="right">Attendee Count</TableCell>
              <TableCell align="right">Entered By</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell component="th" scope="entry">
                  {entry.time.slice(0, -3)}
                </TableCell>
                <TableCell align="right">{entry.vehicle_number}</TableCell>
                <TableCell align="right">{entry.attendee_count}</TableCell>
                <TableCell align="right">
                  {entry.user.first_name} {entry.user.last_name}
                </TableCell>
                <TableCell align="right">
                  {parseInt(window.sessionStorage.getItem("userID")) === entry.user_id ? (
                    <>
                      <EditIcon
                        onClick={() =>
                          props.history.push(`/entry/edit/form/${entry.id}`)
                        }
                      />
                      <DeleteOutlinedIcon
                        onClick={() => deleteThisEntry(entry.id)}
                      />
                    </>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default LocationLog;
