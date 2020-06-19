import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import apiManager from "../api/apiManager";

const Login = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [failedLogin, setFailedLogin] = useState(false);

  const handleFieldChange = (evt) => {
    const stateToChange = { ...formData };
    stateToChange[evt.target.id] = evt.target.value;
    setFormData(stateToChange);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      username: formData.username,
      password: formData.password,
    };

    apiManager.login(user).then((resp) => {
      if ("token" in resp) {
        props.setUserToken(resp);
        props.history.push("/entry/form");
      }
      // If there is no token,
      // the login was unsuccessful,
      // and so an error message is displayed
      else {
        setFailedLogin(true);
      }
    });
  };

  useEffect(() => {}, [failedLogin]);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div onSubmit={handleLogin}>
          <Grid container component="main">
            <CssBaseline />
            <Grid>
              <div>
                <Typography component="h1" variant="h5">
                  Login
                </Typography>
                <form noValidate>
                  {/* {props.failedLogin ? (
              <Message negative>
                <p>
                  The username or password you entered is incorrect, please try
                  again.
                </p>
              </Message>
            ) : (
              <></>
            )} */}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={handleFieldChange}
                  />
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
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link to="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Login;
