import React from "react";
import YouTube from "react-youtube";
import ProgressBar from "./ProgressBar.jsx";
import API from "../api";
import axios from "axios";
import { connect } from "react-redux";
import { getCurrentMeditation } from "../store/actions/meditationActions";
import "./YoutubePlayer.scss";

const youtubeSession = meditationTime => {
  let videoURL;
  switch (meditationTime) {
    case 180:
      videoURL = "iHdviZkM7S4";
      return videoURL;
    case 300:
      videoURL = "xTczn5RUgnk";
      return videoURL;
    case 600:
      videoURL = "KAHKP313P2I";
      return videoURL;

    default:
      return;
  }
};

class YoutubePlayer extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props.meditationSession) {
      console.log("from component did update=====");
      console.log("meditation data have been updated!!");
    }
  }

  componentWillUnmount() {
    console.log(
      "I have unmounted and i will get the updated version of meditation"
    );

    this.props.getCurrentMeditation();
  }

  componentDidMount() {
    if (!this.props.meditationSession) {
      console.log("from componentDidmount====");
      console.log("meditation data not ready yet");
    }
  }
  _onReady = event => {
    // access to player in all event handlers via event.target
    event.target.playVideo();
  };
  onEnd = async event => {
    //console.log(event);
    console.log("video has ended");
    const token = localStorage.getItem("CMCFlow");
    await axios({
      headers: { Authorization: `bearer ${token}` },
      url: API.updateMeditationTime,
      method: "post",
      data: { currentTime: event.target.getCurrentTime() }
    });
    console.log("meditation ended");
  };
  render() {
    const { meditationSession } = this.props;
    const videoId = youtubeSession(meditationSession.sessionDetail.totalTime);
    console.log(videoId);
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    //console.log(meditationSession.sessionDetail);
    return (
      <div className="meditation-player">
        <div onClick={this.props.updatePage} className="close-button">
          X
        </div>

        {this.props.meditationSession ? (
          <>
            <h1>Got meditation session data</h1>
            <h1>PLAY VIDEO HERE</h1>
          </>
        ) : (
          <h1>Got no data</h1>
        )}
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={this._onReady}
          onEnd={this.onEnd.bind(this)}
        />
      </div>
    );
  }
}
const mapDispatch = dispatch => ({
  getCurrentMeditation: () => dispatch(getCurrentMeditation())
});
export default connect(
  null,
  mapDispatch
)(YoutubePlayer);
