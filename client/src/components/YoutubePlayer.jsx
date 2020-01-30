import React from "react";
import YouTube from "react-youtube";
import ProgressBar from "./ProgressBar.jsx";
import API from "../api";
import axios from "axios";
import "./YoutubePlayer.scss";

const token = localStorage.getItem("CMCFlow");

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
      data: { currentTime: 600 }
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

  render() {
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
        {/*<YouTube
         videoId={this.state.videoId}
         opts={opts}
         onReady={this.videoOnReady}
         onPlay={this.videoOnPlay}
         onStateChange={this.videoStateChange}
         className="vidPlayer"
       />
       <button className={"playerButton"} onClick={this.videoBackward}>
         {" "}
         -5sec{" "}
       </button>
       <button className={"playerButton"} onClick={this.videoPlay}>
         Play
       </button>
       <button className={"playerButton"} onClick={this.videoPause}>
         Pause
       </button>
       <button className={"playerButton"} onClick={this.videoForward}>
         {" "}
         +5sec{" "}
       </button>
       <h1>
         {Math.floor(this.state.currentTime)} out of{" "}
         {this.state.prettyDuration}
       </h1>
       <ProgressBar percentage={this.state.percentage} />
       */}
      </div>
    );
  }

  /****

      this parts here we already have the parent component Home getting the information, we can pass it down to Youtube component, looks like all we need is the current time for the meditation session



      ****/
}

export default YoutubePlayer;
