import React, { useState } from "react";

import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import PageFour from "./PageFour";
import { closeQuiz } from "../store/actions/quizActions";
import API from "../api";
import "./Quiz.css";
import axios from "axios";

let Quiz = ({ hasRegistered, turnOffQuiz }) => {
  const [currentPage, setPage] = useState(1);

  const nextPage = () => setPage(currentPage + 1);
  const prevPage = () => setPage(currentPage - 1);

  return (
    <div>
      <h1>starting quizz page</h1>
      <span>
        <button onClick={turnOffQuiz}>Close Quiz</button>
      </span>
      {currentPage === 1 && <PageOne nextPage={nextPage} />}
      {currentPage === 2 && <PageTwo prevPage={prevPage} nextPage={nextPage} />}
      {currentPage === 3 && (
        <PageThree prevPage={prevPage} nextPage={nextPage} />
      )}
      {currentPage === 4 && <PageFour prevPage={prevPage} />}
    </div>
  );
};
const mapDispatch = dispatch => ({
  turnOffQuiz: async () => {
    // let the api knows that the user have close off the quiz and set default to 'beginner'
    const token = localStorage.getItem("CMCFlow");
    let result = await axios({
      url: API.setCourse,
      headers: { Authorization: `bearer ${token}` },
      method: "post",
      data: { startingChoice: "beginner" }
    });
    console.log(result.data);
    dispatch(closeQuiz());
  }
});
Quiz = connect(
  null,
  mapDispatch
)(Quiz);
export default reduxForm({
  form: "quizzForm"
})(Quiz);
