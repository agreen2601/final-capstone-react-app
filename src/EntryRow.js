import React, { useState, useEffect } from "react";
import apiManager from "./api/apiManager";
import EntryCard from "./EntryCard";

const EntryRow = (props) => {
  const [entries, setEntries] = useState([]);
  const [location, setLocation] = useState([]);

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
        Time<span>Vehicle Number</span>
        <span>Attendee Count</span>
      </div>
      <div>
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} {...props} />
        ))}
      </div>
    </>
  );
};

export default EntryRow;
