import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import apiManager from "../api/apiManager";

const Register = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleFieldChange = (evt) => {
    const stateToChange = { ...formData };
    stateToChange[evt.target.id] = evt.target.value;
    setFormData(stateToChange);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = [];
    for (let item in formData) {
      if (formData[item].trim() === "") {
        let newItem = [];
        [...item].forEach((element) => {
          if (element === element.toUpperCase()) {
            newItem.push(" ");
          }
          newItem.push(element.toLowerCase());
        });
        errors.push(newItem.join(""));
      }
    }

    const user = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password,
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
    };

    apiManager
      .register(user)
      .then((r) => {
        if ("token" in r) {
          props.setUserToken(r);
          props.history.push("/entry/form");
        }
      })
      // With a 500 HTTP error, no response is given,
      // so the error must be handled with .catch
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
      .catch(() => {
        alert(
          "This username has already been taken, please try a different one"
        );
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Create new account
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="on">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                margin="normal"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleFieldChange}
              />
            </Grid>
          </Grid>
          <br></br>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Submit
          </Button>
        </form>
        <Grid container justify="flex-end">
          <Grid item>
            <br></br>
            <Link to="/" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Register;
