import React, { useEffect, useState } from "react";
import Quiz from "../components/Quiz";
import { connect } from "react-redux";
import axios from "axios";
import API from "../api";

const Home = ({ hasRegistered }) => {
  const [currentMeditation, setCurrentMeditation] = useState("");

  useEffect(() => {
    const fetchMeditationData = async () => {
      console.log("has registered?: ", hasRegistered);
      const token = localStorage.getItem("CMCFlow");
      const response = await axios({
        headers: { Authorization: `bearer ${token}` },
        method: "get",
        url: API.userMeditation
      });
      console.log("meditation data: ", response.data);
      setCurrentMeditation(response.data);
    };
    fetchMeditationData();
  }, [hasRegistered]);
  //console.log("currnetMeditation data: ", currentMeditation);
  return (
    <>
      {currentMeditation.sessionDetail != undefined ?   
        <> 
        <h1>Home page</h1>
        <p>Current meditation: {currentMeditation._id}</p>
        <p>Completed: {currentMeditation.completed ? "true" : "false" }</p>
        <p>Time: {currentMeditation.sessionDetail.totalTime}</p>
        <p>level: {currentMeditation.sessionDetail.level}</p>
        </>
      :
        <p> hmm</p>
      }
      {hasRegistered ? <Quiz /> : null}
    </>
  );
};
const mapState = state => ({
  hasRegistered: state.auth.hasRegistered
});
export default connect(mapState)(Home);
