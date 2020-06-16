import baseurl from "./baseurl";

export default {
  getAllEntries() {
    return fetch(`${baseurl}/entries`).then((r) => r.json());
  },
  getSingleLocation(locationId) {
    return fetch(`${baseurl}/locations/${locationId}`).then((r) => r.json())
  },
  getEntriesByLocation(locationId) {
    return fetch(`${baseurl}/entries?locationID=${locationId}`).then((r) => r.json())
  },
  getEntriesByLocationAndEvent(locationId, eventID) {
    return fetch(`${baseurl}/entries?locationID=${locationId}&eventID=${eventID}`).then((r) => r.json())
  },
  getAllLocations() {
    return fetch(`${baseurl}/locations`).then((r) => r.json());
  },
  getSingleLocation(locationID) {
    return fetch(`${baseurl}/locations/${locationID}`).then((r) => r.json())
  },
  getAllEvents() {
    return fetch(`${baseurl}/events`).then((r) => r.json());
  },
  postEntry(newEntry) {
    return fetch(`${baseurl}/entries`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(newEntry)
    }).then((r) => r.json());
  },
};
