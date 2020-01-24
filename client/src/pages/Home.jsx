import React, { useEffect, useState } from "react";
import Quiz from "../components/Quiz";
import { connect } from "react-redux";
import axios from "axios";
import API from "../api";

const Home = ({ hasRegistered }) => {
  const [currentMeditation, setCurrentMeditation] = useState("");

  useEffect(() => {
    const fetchMeditationData = async () => {
      const token = localStorage.getItem("CMCFlow");
      const response = await axios({
        headers: { Authorization: `bearer ${token}` },
        method: "get",
        url: API.userMeditation
      })
      await setCurrentMeditation(response.data);
    }
    fetchMeditationData();

    console.log(currentMeditation)
  }, [])

  // useEffect(() => {
  //   console.log("from home page, register status: ", hasRegistered);
  // }, [hasRegistered]);

  return (
    <>
      <h1>Home page</h1>
      <p>Current meditation: {currentMeditation._id}</p>
      {hasRegistered ? <Quiz /> : null}
    </>
  );
};
const mapState = state => ({
  hasRegistered: state.auth.hasRegistered
});
export default connect(mapState)(Home);
