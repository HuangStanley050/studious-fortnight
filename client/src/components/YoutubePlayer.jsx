import React, {useEffect, useState} from "react";
import YouTube from "react-youtube";
// import ProgressBar from "./ProgressBar.jsx";
import API from "../api";
import axios from "axios";
import { connect } from "react-redux";
import { getCurrentMeditation } from "../store/actions/meditationActions";
import "./YoutubePlayer.scss";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

//when server is running: 
//0. check if video starts paused (changed opts autoplay to 2 so it should be)
//1. check if player.setVolume(50) in useEffect works
//2. check if we can use videos with sound, in the youtubeSession function below.
//3. check if the new percentage logic works on line 49.
//4. figure out a way to style the component: overlap circlePlay / circlePause using fixed position or something? 
//5. try to style circularProgressionbar better. different colours etc check out: https://www.npmjs.com/package/react-circular-progressbar
//6. display the complete page

const youtubeSession = meditationTime => {
  let videoURL;
  switch (meditationTime) {
    case 180:
      videoURL = "iHdviZkM7S4";
      //instead use this one, it has sound:
      // videoURL = "cI4ryatVkKw";
      return videoURL;
    case 300:
      videoURL = "xTczn5RUgnk";
      //instead use this one, it has sound:
      // videoURL = "_6_akBtKZdE";
      return videoURL;
    case 600:
      videoURL = "KAHKP313P2I";
      //instead use this one, it has sound:
      // videoURL = "w6wIqnK5GPE";
      return videoURL;
    default:
      return;
  }
};

const YoutubePlayer = (props) => {
  const [finished, setFinished] = useState(false)
  const [video, setVideo] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false)

  //hardcoded, needs to be dynamic using video somehow
  let percentage = 60;

  //let percentage = video.getCurrentTime() / video.getDuration()
  console.log(video);

  useEffect(() => {
    return () => {
      //runs when component unmounts!
      console.log(
        "I have unmounted and i will get the updated version of meditation"
      );
      props.getCurrentMeditation();
    }
  }, []);

  const _onReady = event => {
    setVideo(event.target)
    // access to player in all event handlers via event.target

    //should set the volume at 50: 
    // video.setVolume(50);

    //it should pause automatically now without the below? 
    // event.target.pauseVideo();
  };

  const playTheVideo = () => {
    video.playVideo();
    setVideoPlaying(true);
  }
  const pauseTheVideo = () => {
    video.pauseVideo();
    setVideoPlaying(false);
  }

  const onEnd = async event => {
    //console.log(event);
    console.log("video has ended");
    setFinished(true);
    const token = localStorage.getItem("CMCFlow");
    await axios({
      headers: { Authorization: `bearer ${token}` },
      url: API.updateMeditationTime,
      method: "post",
      data: { currentTime: event.target.getCurrentTime() }
    });
    
  }

    const { meditationSession } = props;
    const videoId = youtubeSession(meditationSession.sessionDetail.totalTime);

    const opts = {
      height: "100",
      width: "200",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 2
      }
    };

    return (
      <div className="meditation-player">
        <div onClick={props.updatePage} className="close-button">
          X
        </div>
          {/* {props.meditationSession ? (
            <>
              <h1>Got meditation session data</h1>
              <h1>PLAY VIDEO HERE</h1>
            </>
          ) : (
            <h1>Got no data</h1>
          )} */}

        {finished ? 
          <div>
            **finished**
            left side: 
            "well done"
            total time meditated

            right side: 
            display quote here 
            click "complete" button
            x is removed from top left hand corner, complete button has same functionality
          </div> 
        : 
          <div className="meditation-component">
            <div>{meditationSession.sessionDetail.totalTime == 180 && "BEGINNER"}
            {meditationSession.sessionDetail.totalTime == 300 && "INTERMEDIATE"}
            {meditationSession.sessionDetail.totalTime == 600 && "EXPERT"}
            &nbsp;
             {meditationSession.sessionDetail.level}</div>
            <h4>Lets start your meditation session.</h4>
            <YouTube
              videoId={videoId}
              opts={opts}
              onReady={_onReady}
              onEnd={onEnd}
            />
            <CircularProgressbar value={percentage} text={`${percentage}%`} />;
            <div className="loading-bar">
              {
                videoPlaying ? 
                <div className="circlePause" onClick={pauseTheVideo}>
                  <i class="fas fa-pause fa-4x"></i>
                </div>
                :
                <div className="circlePlay" onClick={playTheVideo}>
                  <i class="fas fa-play fa-4x"></i>
                </div>
              }
            </div>
            <div>{meditationSession.sessionDetail.totalTime / 60} MINUTES</div>
          </div>
        }  
      </div>
    )
}


const mapDispatch = dispatch => ({
  getCurrentMeditation: () => dispatch(getCurrentMeditation())
});
export default connect(
  null,
  mapDispatch
)(YoutubePlayer);