import React, { useEffect, useState } from "react";
import Quiz from "../components/Quiz";
import { connect } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader";
import API from "../api";
import YoutubePlayer from "../components/YoutubePlayer.jsx";
import { getCurrentMeditation } from "../store/actions/meditationActions";
import "./Home.scss";

const Home = ({ hasRegistered, meditationSession, dispatch }) => {
  //const [currentMeditation, setCurrentMeditation] = useState({});
  const [error, setError] = useState("");
  const [playSession, setPlaySession] = useState(false);
  const [fetchApi, setFetchApi] = useState(true);
  const errorMsg = <h4>Pleaes go to discover page and pick a meditation</h4>;

  useEffect(() => {
    if (!meditationSession) {
      //console.log("this is from Home component");
      dispatch(getCurrentMeditation());
      //console.log("meditation session: ", meditationSession);
    }
  }, [dispatch, hasRegistered, meditationSession]);

  // useEffect(() => {
  //   setFetchApi(false);
  //   console.log("fetch api rendering.....");
  //   dispatch(getCurrentMeditation());
  // }, [fetchApi, dispatch]);

  const updatePage = () => {
    setPlaySession(!playSession);
    //console.log(meditationSession);
  };

  return (
    <>
      {hasRegistered ? <Quiz /> : null}
      {meditationSession ? (
        <>
          {playSession ? (
            <YoutubePlayer
              meditationSession={meditationSession}
              updatePage={updatePage}
              // setFetchApi={setFetchApi}
              // fetchApi={fetchApi}
            />
          ) : (
            <div className="landing-page">
              <p>Level {meditationSession.sessionDetail.level}</p>

              {meditationSession.sessionDetail.totalTime === 180 ? (
                <h1>Beginner</h1>
              ) : (
                ""
              )}
              {meditationSession.sessionDetail.totalTime === 300 ? (
                <h1>Intermediate</h1>
              ) : (
                ""
              )}
              {meditationSession.sessionDetail.totalTime === 600 ? (
                <h1>Expert</h1>
              ) : (
                ""
              )}
              {/* <p onClick={updatePage}>Click to play</p> */}
              <div className="buttons">
                <div className="begin-button" onClick={updatePage}>
                  BEGIN
                </div>
                <div className="time-button" onClick={updatePage}>
                  {meditationSession.sessionDetail.totalTime / 60} MIN
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
const mapState = state => ({
  hasRegistered: state.auth.hasRegistered,
  meditationSession: state.auth.meditationSession
});
export default connect(mapState)(Home);
