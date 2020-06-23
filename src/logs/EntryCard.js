import React from "react";

const EntryCard = (props) => {
  const entry = props.entry;
  const deleteThisEntry = props.deleteThisEntry

  return (
    <>
      <div>
        <span>{entry.time.slice(0, -3)} </span>
        <span>{entry.vehicle_number} </span>
        <span>{entry.attendee_count} </span>
        <span>
          {entry.user.first_name} {entry.user.last_name}
        </span>
        {window.sessionStorage.getItem("userID") == entry.user_id ? (
          <>
            <button onClick={() => props.history.push(`/entry/edit/form/${entry.id}`)}>Edit</button>
            <button onClick={() => deleteThisEntry(entry.id)}>Delete</button>
          </>
        ) : null}
      </div>
    </>
  );
};

export default EntryCard;
