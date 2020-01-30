import React from "react";
import YouTube from "react-youtube";
import ProgressBar from "./ProgressBar.jsx";
import API from "../api";
import axios from "axios";
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
    // // 3minutes below
    // case "1":
    //   videoURL = "iHdviZkM7S4"; //3 mins
    //   return videoURL;
    // case "2":
    //   videoURL = "4Lm0o3XGKIY";
    //   return videoURL;
    // case "3":
    //   videoURL = "UIrLyE7iz50";
    //   return videoURL;
    // //5minutes below
    // case "4":
    //   videoURL = "W0bSen8Qjg";
    //   return videoURL;
    // case "5":
    //   videoURL = "xTczn5RUgnk";
    //   return videoURL;
    // case "6":
    //   videoURL = "6_akBtKZdE";
    //   return videoURL;
    // case "7":
    //   videoURL = "nkqnuxKj8Dk";
    //   return videoURL;
    // //10 minutes below
    // case "8":
    //   videoURL = "KAHKP313P2I";
    //   return videoURL;
    // case "9":
    //   videoURL = "4ASKMcdCc3g";
    //   return videoURL;
    // case "10":
    //   videoURL = "OvxwaacXTUA";
    //   return videoURL;
    // case "11":
    //   videoURL = "smZbpBsny9c";
    //   return videoURL;
    // case "12":
    //   videoURL = "Ihq64W33cyo";
    //   return videoURL;
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

  async componentWillUnmount() {
    console.log("component unmounted");
    const token = localStorage.getItem("CMCFlow");
    let result = await axios({
      headers: { Authorization: `Bearer ${token}` },
      url: API.updateMeditationTime,
      method: "post",
      data: { currentTime: 180 }
    });
    console.log(result.data);
    this.props.updatePage();
  }

  componentDidMount() {
    if (!this.props.meditationSession) {
      console.log("from componentDidmount====");
      console.log("meditation data not ready yet");
    }
  }
  _onReady = event => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  onPause = async event => {
    // console.log("current time: ", event.target.getCurrentTime());
    // console.log("duration: ", event.target.getDuration());
    //console.log(event.target.getDuration());
    const token = localStorage.getItem("CMCFlow");
    let result = await axios({
      headers: { Authorization: `bearer ${token}` },
      url: API.updateMeditationTime,
      method: "post",
      data: { currentTime: event.target.getCurrentTime() }
    });
    console.log(result.data);
  };
  onEnd = event => {
    //console.log(event);
    console.log("video has ended");
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
          onPause={this.onPause} // defaults -> noop
          onEnd={this.onEnd}
        />
      </div>
    );
  }

  /****

      this parts here we already have the parent component Home getting the information, we can pass it down to Youtube component, looks like all we need is the current time for the meditation session



      ****/
}

export default YoutubePlayer;
