import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
    };
  }

  skipSong() {
    // var respStatus;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", requestOptions)
    
    // .then((response) => {
    //   respStatus = response.status;
    //   if (respStatus == 204) {
    //     this.setState({
    //       msg: "Oops.. Need a premium Spotify account",
    //     });
    //   } else if (respStatus == 500) {
    //     this.setState({ msg: "Server error, try again" });
    //   } else {
    //     this.setState({ msg: "" });
    //   }
    //   console.log(respStatus);
    // });
  }

  pauseSong() {
    var respStatus;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions).then((response) => {
      respStatus = response.status;
      if (respStatus == 204) {
        this.setState({
          msg: "Oops.. Need a premium Spotify account",
        });
      } else if (respStatus == 403) {
        this.setState({ msg: "Oops.. play/pause access denied by room host" });
      } else if (respStatus == 500) {
        this.setState({ msg: "Server error, try again" });
      } else {
        this.setState({ msg: "" });
      }
    });
  }

  playSong() {
    var respStatus;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", requestOptions).then((response) => {
      respStatus = response.status;
      if (respStatus == 204) {
        this.setState({
          msg: "Oops.. Need a premium Spotify account",
        });
      } else if (respStatus == 403) {
        this.setState({ msg: "Oops.. play/pause access denied by room host" });
      } else if (respStatus == 500) {
        this.setState({ msg: "Server error, try again" });
      } else {
        this.setState({ msg: "" });
      }
    });
  }

  render() {
    const songProgress = (this.props.time / this.props.duration) * 100;

    const styles = {
      snakbar: {
        width: "fit-content",
        alignItems: "center",
        position: "fixed",
        top: "110%",
      },
    };

    return (
      <Card>
        <Grid container alignItems="center">
          <Grid item align="center" xs={4}>
            <img src={this.props.image_url} height="100%" width="100%" />
          </Grid>
          <Grid item align="center" xs={8}>
            <Typography component="h5" variant="h5">
              {this.props.title}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              {this.props.artist}
            </Typography>
            <div>
              <IconButton
                onClick={() => {
                  this.props.is_playing ? this.pauseSong() : this.playSong();
                }}
              >
                {this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton
                onClick={() => {
                  this.skipSong();
                }}
              >
                {" "}
                {this.props.votes} / {this.props.votes_required}{" "}
                <SkipNextIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
        <Grid spacing={2} sx={{ maxWidth: 800 }}>
          <Snackbar
            style={styles.snakbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={this.state.msg != ""}
            autoHideDuration={4000}
            onClose={() => {
              this.setState({
                msg: "",
              });
            }}
          >
            <Alert
              onClose={() => {
                this.setState({
                  msg: "",
                });
              }}
              severity="warning"
              variant="outlined"
              sx={{ width: "100%" }}
            >
              {this.state.msg}
            </Alert>
          </Snackbar>
        </Grid>
      </Card>
    );
  }
}
