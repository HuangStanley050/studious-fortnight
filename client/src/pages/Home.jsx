import React, { useEffect } from "react";
import Quiz from "../components/Quiz";
import { connect } from "react-redux";

const Home = ({ hasRegistered }) => {
  // useEffect(() => {
  //   console.log("from home page, register status: ", hasRegistered);
  // }, [hasRegistered]);
  return (
    <>
      <h1>Home page</h1>
      {hasRegistered ? <Quiz /> : null}
    </>
  );
};
const mapState = state => ({
  hasRegistered: state.auth.hasRegistered
});
export default connect(mapState)(Home);
