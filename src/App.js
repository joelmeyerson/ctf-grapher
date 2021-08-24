import React, { useState } from "react";
//import "./App.css"
import ctfEqn from "./ctf-eqn.svg";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { teal, grey } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Graph from "./Graph.js";
import ControlDefocus from "./ControlDefocus.js";
import ControlVoltage from "./ControlVoltage.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    margin: 0,
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  control: {
    height: "150px",
    width: "400px",
  },
  paperControl: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "110px",
  },
}));

const theme = createTheme({
  palette: {
    text: {
      primary: teal[300],
    },
    background: {
      default: grey[800],
    },
    primary: {
      main: teal[300],
    },
  },
});

export default function App() {
  const classes = useStyles();
  const [voltage, setVoltage] = useState(300000);
  const [defocus, setDefocus] = useState(10000);

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid
          container
          spacing={3}
          direction="column"
          justifyContent="center"
          alignItems="center"
          className={classes.container}
        >
          <Grid item xs={6}>
            <Typography variant="h4">CTF Grapher</Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Graph voltage={voltage} defocus={defocus} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <img src={ctfEqn} alt="ctf equation" />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              spacing={3}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className={classes.container}
            >
              <Grid item xs={6} className={classes.control}>
                <Paper className={classes.paperControl}>
                  <ControlDefocus setDefocus={setDefocus} defocus={defocus} />
                </Paper>
              </Grid>
              <Grid item xs={6} className={classes.control}>
                <Paper className={classes.paperControl}>
                  <ControlVoltage setVoltage={setVoltage} voltage={voltage} />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Link
              href="https://github.com/joelmeyerson/ctf-grapher"
              target="_blank"
              variant="inherit"
            >
              Source code
            </Link>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
