import baseurl from "./baseurl";

export default {
  getAllType(type) {
    return fetch(`${baseurl}/${type}`).then((r) => r.json());
  },
  getSingleType(type, id) {
    return fetch(`${baseurl}/${type}/${id}`).then((r) => r.json());
  },
  postEntry(newEntry) {
    return fetch(`${baseurl}/entries`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${window.sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(newEntry),
    }).then((r) => r.json());
  },
  updateEntry(entry) {
    return fetch(`${baseurl}/entries/${entry.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${window.sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(entry),
    });
  },
  deleteEntry(id) {
    return fetch(`${baseurl}/entries/${id}`, {
      method: "DELETE",
    });
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
