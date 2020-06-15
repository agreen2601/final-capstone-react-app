import React, { useState, useEffect } from "react";
import apiManager from "./api/apiManager";
import EntryCard from "./EntryCard";

const EntryRow = (props) => {
  const [entries, setEntries] = useState([]);

  const getEntries = (locationId) => {
    apiManager.getEntriesByLocation(locationId).then((r) => {
      setEntries(r);
    });
  };

  useEffect(() => {
    getEntries(props.chosenLocation);
  }, [props.chosenLocation]);

  return (
    <>
      <div>
        {entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} {...props} />
        ))}
      </div>
    </>
  );
};

export default EntryRow;
