import React from "react";

const EntryCard = (props) => {
  const entry = props.entry;

  return (
    <>
      <div>
        <span>{entry.time.slice(0, -3)} </span>
        <span>{entry.vehicle_number} </span><span>{entry.attendee_count} </span>
        <span>{entry.user.first_name} {entry.user.last_name}</span>
      </div>
    </>
  );
};

export default EntryCard;
