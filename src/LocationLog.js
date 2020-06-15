import React from "react";
import EntryRow from "./EntryRow";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

const LocationLog = (props) => {
  const locations = props.locations;
  const chosenLocation = props.chosenLocation;
  const handleChosenLocationChange = props.handleChosenLocationChange;
  const handleChosenEventChange = props.handleChosenEventChange;

  return (
    <>
      <div>
        <h1 className="event_header">Location Logs</h1>
        <Grid item xs={12} md={3}>
          <InputLabel htmlFor="age-native-simple">Select Location: </InputLabel>
          <Select
            id="locationId"
            native
            onChange={handleChosenLocationChange}
            fullWidth
            required
            label="??"
            value={chosenLocation}
          >
            <option aria-label="None" value="0">
              Select Location
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
      </div>
      <div className="location_log_header"></div>
      <div className="list-container">
        {locations
          .filter((location) => location.id === chosenLocation)
          .map((location) => (
            <EntryRow key={location.id} location={location} {...props} />
          ))}
      </div>
    </>
  );
};

export default LocationLog;
