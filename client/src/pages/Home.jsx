import React, { useEffect, useState } from "react";
import Quiz from "../components/Quiz";
import { connect } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader";
import API from "../api";
import YoutubePlayer from "../components/YoutubePlayer.jsx";
import { getCurrentMeditation } from "../store/actions/meditationActions";

const Home = ({ hasRegistered, meditationSession, dispatch }) => {
  //const [currentMeditation, setCurrentMeditation] = useState({});
  const [error, setError] = useState("");

  const errorMsg = <h4>Pleaes go to discover page and pick a meditation</h4>;

  useEffect(() => {
    if (!meditationSession) {
      //console.log("this is from Home component");
      dispatch(getCurrentMeditation());
      //console.log("meditation session: ", meditationSession);
    }
  }, [dispatch, hasRegistered, meditationSession]);

  

  return (
    <>

      <YoutubePlayer meditationSession={meditationSession} />

      {hasRegistered ? <Quiz /> : null}
    </>
  );
};
const mapState = state => ({
  hasRegistered: state.auth.hasRegistered,
  meditationSession: state.auth.meditationSession
});
export default connect(mapState)(Home);
