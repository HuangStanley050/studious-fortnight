import React from "react";
import YouTube from "react-youtube";
import ProgressBar from "./ProgressBar.jsx";
import API from "../api";
import axios from "axios";
import "./YoutubePlayer.scss";

const token = localStorage.getItem("CMCFlow");

class YoutubePlayer extends React.Component {
  state = {
    player: null,
    currentTime: 0,
    duration: 0,
    percentage: 0,
    watchComplete: false,
    videoId: "Qma7wnicDnk",
    prettyDuration: 0
  };
  myInterval = null;
  videoOnReady = event => {
    // access to player in all event handlers via event.target
    const player = event.target;
    console.log("Youtube player object: ", player);

    this.setState({
      player: player
    });

    this.getDuration();
    this.prettyDuration();

    //choose if auto play or auto pause on load.
    this.videoPlay();
    // this.videoPause()
  };

  // check if % complete, and is used for the progress bar
  //
  setVideoTimes = () => {
    this.myInterval = setInterval(() => {
      let newPercent = (100 / this.state.duration) * this.state.currentTime;

      this.setState(() => {
        return { currentTime: this.currentTime(), percentage: newPercent };
      });
      //console.log("running");
      this.setComplete();
    }, 500);
  };

  setComplete = async () => {
    if (this.state.percentage >= 90 && this.state.watchComplete === false) {
      this.setState(() => {
        return { watchComplete: true };
      });

      const player = this.state.player;
      const currentTime = player.getCurrentTime();
      await axios({
        headers: { Authorization: `bearer ${token}` },
        data: {
          currentTime: currentTime,
          completed: this.state.watchComplete
        },
        method: "post",
        url: API.updateMeditationTime
      });

      console.log(this.state.watchComplete);
    }
  };

  getDuration = () => {
    const current = this.state.player.getDuration();

    this.setState(() => {
      return { duration: current };
    });
  };

  prettyDuration = () => {
    const current = this.state.player.getDuration();

    function timeConvert(num) {
      let minutes = num / 60;
      let rminutes = Math.floor(minutes);
      let seconds = (minutes - rminutes) * 60;
      let rseconds = Math.round(seconds);
      return rminutes + " : " + rseconds;
    }

    // let calculatedTime = parseFloat(timeConvert(current))
    let calculatedTime = timeConvert(current);

    this.setState(() => {
      return { prettyDuration: calculatedTime };
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
    clearInterval(this.myInterval);
    let newPercent = (100 / this.state.duration) * this.state.currentTime;
    this.setState(prevState => {
      return { percentage: newPercent };
    });
    //maybe put a POST request in here.
  };

  //   videoStateChange (event) {
  //     const player = event.target
  //     console.log("this is the time >>>> " + player.getCurrentTime())
  //   }

  videoBackward = () => {
    const newTime = this.state.currentTime - 5;
    this.state.player.seekTo(newTime);
  };
  videoForward = () => {
    const newTime = this.state.currentTime + 5;
    this.state.player.seekTo(newTime);
  };
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props.meditationSession) {
      console.log("from component did update=====");
      console.log("meditation data have been updated!!");
    }
  }
  componentDidMount() {
    if (!this.props.meditationSession) {
      console.log("from componentDidmount====");
      console.log("meditation data not ready yet");
    }
    // this grabs the video url and sets it into state and then instantiates a player instance
    // const APIcalls = async () => {
    //   const onLoad = await axios({
    //     headers: { Authorization: `bearer ${token}` },
    //     method: "get",
    //     // url: API.returnUserMeditation
    //     url: API.getVideo
    //   });
    //   // console.log(onLoad.data)
    //   if (onLoad.data) {
    //     const video = onLoad.data;
    //
    //     this.setState({
    //       videoId: video
    //     });
    //   }
    //this gets the current meditation from User and sets time to the video
    /****

      this parts here we already have the parent component Home getting the information, we can pass it down to Youtube component, looks like all we need is the current time for the meditation session



      ****/
    // const response = await axios({
    //   headers: { Authorization: `bearer ${token}` },
    //   method: "get",
    //   url: API.userMeditation
    // });
    // if (response.data) {
    //   const savedCurrentTime = response.data.sessionDetail.currentTime;
    //
    //   this.setState({
    //     currentTime: savedCurrentTime
    //   });
    //   // this.state.player.seekTo(this.state.currentTime)
    // }
    //};
    //APIcalls();
    // console.log(this.state.player)
    // //choose if auto play or auto pause on load.
    // this.videoPlay();
    // this.videoPause()
  }

  // componentWillUnmount() {
  //   clearInterval(this.myInterval);
  //
  //   const player = this.state.player;
  //   const currentTime = player.getCurrentTime();
  //   const APIunmount = async () => {
  //     const endOfSession = await axios({
  //       headers: { Authorization: `bearer ${token}` },
  //       data: {
  //         currentTime: currentTime,
  //         completed: this.state.watchComplete
  //       },
  //       method: "post",
  //       url: API.updateMeditationTime
  //     });
  //     console.log({ ...endOfSession });
  //   };
  //
  //   APIunmount();
  // }

  render() {
    // console.log(
    //   "This is from youtube component: ",
    //   this.props.meditationSession
    // );
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
    //     this.getDuration();
    // this.prettyDuration();
    // if (this.props.meditationSession) {
    //   console.log("Youtube component got data: ", this.props.meditationSession);
    // }
    return (
      <div className="meditation-player">
        <div 
          onClick={this.props.updatePage}
          className="close-button"
        >X</div>

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
}

export default YoutubePlayer;
