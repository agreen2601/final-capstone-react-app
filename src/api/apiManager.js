import baseurl from "./baseurl";

//  get token for authentication
let token = window.sessionStorage.getItem("token");
// change this into a function everytime i need token, call function

export default {
  getAllEntries() {
    return fetch(`${baseurl}/entries`).then((r) => r.json());
  },
  getSingleLocation(locationId) {
    return fetch(`${baseurl}/locations/${locationId}`).then((r) => r.json());
  },
  getEntriesByLocation(locationId) {
    return fetch(`${baseurl}/entries?locationID=${locationId}`).then((r) =>
      r.json()
    );
  },
  getEntriesByLocationAndEvent(locationId, eventID) {
    return fetch(
      `${baseurl}/entries?locationID=${locationId}&eventID=${eventID}`
    ).then((r) => r.json());
  },
  getAllLocations() {
    return fetch(`${baseurl}/locations`).then((r) => r.json());
  },
  getAllEvents() {
    return fetch(`${baseurl}/events`).then((r) => r.json());
  },
  postEntry(newEntry) {
    return fetch(`${baseurl}/entries`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(newEntry),
    }).then((r) => r.json());
  },
  register(userToPost) {
    return fetch(`${baseurl}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToPost),
    }).then((result) => result.json());
  },
  login(userToLogin) {
    return fetch(`${baseurl}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToLogin),
    }).then((result) => result.json());
  },
};
