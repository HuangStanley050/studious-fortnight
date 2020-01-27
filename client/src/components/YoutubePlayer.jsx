import React from "react";
import YouTube from "react-youtube";
import ProgressBar from "./ProgressBar.jsx";
import API from "../api";
import axios from "axios";

class YoutubePlayer extends React.Component {
  state = {
    player: null,
    currentTime: 0,
    duration: 0,
    percentage: 0,
    watchComplete: false,
    videoId: ""
  };

  //adds a videoplayer when component is ready
  async componentDidMount() {

    const response = await axios({
      headers: { Authorization: `bearer ${token}` },
      method: "get",
      url: API.userMeditation
    })
    if(response.data){
      console.log(...response.data)
      // this.setState({ 
      //   currentTime: currentTime
      // })
    }
  // this.state.player.seekTo(currentTime)
  }
  videoOnReady = event => {
    // access to player in all event handlers via event.target
    const player = event.target;

    this.setState({
      player: player
    });

    this.getDuration();
    this.videoPlay();
    // this.videoPause()
    console.log(event.target);
  };

  // this will run once the videoOnReady function is run
  setVideoTimes = () => {
    this.myInterval = setInterval(() => {
      let newPercent = (100 / this.state.duration) * this.state.currentTime;

      this.setState(() => {
        return { currentTime: this.currentTime(), percentage: newPercent };
      });
      this.setComplete();
    }, 100);
  };

  getDuration = () => {
    this.setState(() => {
      return { duration: this.state.player.getDuration() };
    });
  };
  currentTime = () => {
    return this.state.player.getCurrentTime();
  };

  videoPlay = () => {
    this.state.player.playVideo();
    this.setVideoTimes();
  };

  videoPause = () => {
    this.state.player.pauseVideo();

    let newPercent = (100 / this.state.duration) * this.state.currentTime;
    this.setState(prevState => {
      return { percentage: newPercent };
    });
  };
  //   videoStateChange (event) {
  //     const player = event.target
  //     console.log("this is the time >>>> " + player.getCurrentTime())
  //   }

  setComplete = () => {
    if (this.state.percentage >= 90 && this.state.watchComplete === false) {
      this.setState(() => {
        return { watchComplete: true };
      });
      console.log(this.state.watchComplete);
    }
  };

  videoBackward = () => {
    const newTime = this.state.currentTime - 5;
    this.state.player.seekTo(newTime);
  };
  videoForward = () => {
    const newTime = this.state.currentTime + 5;
    this.state.player.seekTo(newTime);
  };

  async componentWillUnmount() {
    const player = this.state.player;
    const currentTime = player.getCurrentTime();
    const token = localStorage.getItem("CMCFlow");
    const endOfSession = await axios({
      headers: { Authorization: `bearer ${token}` },
      data: {
        currentTime: currentTime,
        completed: this.state.watchComplete
      },
      method: "post",
      url: API.updateMeditationTime
    });

    console.log(...endOfSession);
  }

  render() {
    const opts = {
      height: "200",
      width: "400",
      style: "border: solid 4px #37474F",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        //disables player controls
        controls: 0,
        showinfo: 0,
        //disables Keyboard controls
        disablekb: 1,
        modestbranding: 1
      }
    };
    const { videoId } = this.props;
    return (
      <div>
        <YouTube
          videoId={videoId}
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
          {Math.floor(this.state.currentTime)} : {this.state.duration}
        </h1>
        <ProgressBar percentage={this.state.percentage} />
      </div>
    );
  }
}

export default YoutubePlayer;
