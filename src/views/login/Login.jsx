import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LoginAPI from "views/login/LoginApi";
import PropTypes from "prop-types";
import Token from "utility/useToken";
import { useHistory } from "react-router-dom";

// import { useState, useEffect } from "react";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const UseStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// const auth = function (){
//   console.log("this");
// }
// const auth = function (e) {
//   e.preventDefault();
//   console.log("this");
//   // return false;
//   props.history.push('/dashboard')
// }

// const useFetch = url => {
//   const [data, setData] = useState(null);

//   async function fetchData() {
//     const response = await fetch(url);
//     const json = await response.json();
//     setData(json);
//   }

//   useEffect(() => {fetchData()},[url]);

//   return data;
// };

export default function Login({ setToken }) {
  const classes = UseStyles();
  // eslint-disable-next-line no-unused-vars
  const tokenObj = Token();
  console.log(setToken);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let sourcePath = "Dashboard";
  const hist = useHistory();
  if (setToken === undefined) {
    sourcePath = "Login";
    if (tokenObj.token) hist.push("/admin/dashboard");
  }
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            method="POST"
            onSubmit={(e) =>
              LoginAPI(
                e,
                email,
                password,
                setToken === undefined ? tokenObj.setToken : setToken,
                sourcePath,
                hist
              )
            }
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="./dashboard" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };
