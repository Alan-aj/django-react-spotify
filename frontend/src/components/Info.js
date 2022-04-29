import React, { useState } from "react";
import { Grid, Button, Typography, IconButton } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ArrowRight from "@material-ui/icons/ArrowRight";
import { Link } from "react-router-dom";

const pages = {
  JOIN: "pages.join",
  CREATE: "pages.create",
};

export default function Info(props) {
  const [page, setPage] = useState(pages.JOIN);

  function joinInfo() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h6" gutterBottom component="div">
            Join Page
          </Typography>
        </Grid>
        <Grid item xs={12} align="left">
          <Typography variant="body1" gutterBottom>
            ◼ User can join a room with the Room Code.
          </Typography>
          <Typography variant="body1" gutterBottom>
            ◼ Joining user should have an active Spotify account.
          </Typography>
          <Typography variant="body1" gutterBottom>
            ◼ User can vote for skipping the current playing song. A song will
            only be skipped after reaching the specified number of votes.
          </Typography>
          <Typography variant="body1" gutterBottom>
            ◼ User can pause/play song only if host of the room allowed.
          </Typography>
        </Grid>
      </Grid>
    );
  }

  function createInfo() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h6" gutterBottom component="div">
            Create Page
          </Typography>
        </Grid>
        <Grid item xs={12} align="left">
          <Typography variant="body1" gutterBottom>
            ◼ To create a room, user should have an active Spotify account.
          </Typography>
          <Typography variant="body1" gutterBottom>
            ◼ Pause/play and skip will only be awailable for premium Spotify users. 
            User can manually control playback through Spotify app.
          </Typography>
          <Typography variant="body1" gutterBottom>
            ◼ Host of the room can set the number of votes needed to skip song.
          </Typography>
          <Typography variant="body1" gutterBottom>
            ◼ Host of the room can set whether other user can pause/play song.
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          What is House Party?
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="body1">
          {page === pages.JOIN ? joinInfo() : createInfo()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <IconButton
          onClick={() => {
            page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE);
          }}
        >
          {page === pages.CREATE ? (
            <NavigateBeforeIcon />
          ) : (
            <NavigateNextIcon />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
