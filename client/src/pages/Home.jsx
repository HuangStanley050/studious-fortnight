import React, { useEffect, useState } from "react";
import Quiz from "../components/Quiz";
import { connect } from "react-redux";
import axios from "axios";
import API from "../api";
import YoutubePlayer from "../components/YoutubePlayer.jsx"

const Home = ({ hasRegistered }) => {
  const [currentMeditation, setCurrentMeditation] = useState("");
  const [error, setError] = useState("");
  const errorMsg = <h4>Pleaes go to discover page and pick a meditation</h4>;
  useEffect(() => {
    const fetchMeditationData = async () => {
      try {
        console.log("has registered?: ", hasRegistered);
        const token = localStorage.getItem("CMCFlow");
        const response = await axios({
          headers: { Authorization: `bearer ${token}` },
          method: "get",
          url: API.userMeditation
        });
        console.log("meditation data: ", response.data);
        setCurrentMeditation(response.data);
        setError("");
      } catch (err) {
        console.log(err.response.data.msg);
        setError(err.response.data.msg);
      }
    };
    fetchMeditationData();
  }, [hasRegistered]);
  //console.log("currnetMeditation data: ", currentMeditation);
  return (
    <>
      {currentMeditation.sessionDetail != undefined ? (
        <>
          <h1>Home page</h1>
          <p>Current meditation: {currentMeditation._id}</p>
          <p>Completed: {currentMeditation.completed ? "true" : "false"}</p>
          <p>Time: {currentMeditation.sessionDetail.totalTime}</p>
          <p>level: {currentMeditation.sessionDetail.level}</p>
          <YoutubePlayer 
      className="vidPlayer"
      />
        </>
      ) : (
        <p> hmm</p>
      )}
      {error ? errorMsg : null}
      {hasRegistered ? <Quiz /> : null}
    </>
  );
};
const mapState = state => ({
  hasRegistered: state.auth.hasRegistered
});
export default connect(mapState)(Home);
