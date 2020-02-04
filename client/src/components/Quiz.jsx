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
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import axios from "axios";

export let Quiz = ({ hasRegistered, turnOffQuiz }) => {
  const [currentPage, setPage] = useState(1);
  const [modal, setModal] = useState(true);
  const toggle = () => {
    turnOffQuiz();
    setModal(!modal);
  };
  const externalCloseBtn = (
    <button
      className="close"
      style={{ position: "absolute", top: "15px", right: "15px" }}
      onClick={toggle}
    >
      &times;
    </button>
  );
  const nextPage = () => setPage(currentPage + 1);
  const prevPage = () => setPage(currentPage - 1);

  return (
    <div>
      <Modal
        //backdrop={false}
        data-testid="quiz-modal"
        centered
        size="xl"
        style={{
          minWidth: "100vw",
          minheight: "100vh",
          margin: "0"
        }}
        isOpen={modal}
        toggle={toggle}
        //external={externalCloseBtn}
      >
        <ModalHeader style={{ backgroundColor: "#ddd6d6" }}>
          <Button onClick={toggle} className="cancel-button">
            Close
          </Button>{" "}
        </ModalHeader>

        {/*<span>
          <button onClick={turnOffQuiz}>Close Quiz</button>
        </span>*/}
        <ModalBody style={{ backgroundColor: "rgba(84, 84, 84, 0.1)" }}>
          {currentPage === 1 && <PageOne nextPage={nextPage} />}
          {currentPage === 2 && (
            <PageTwo prevPage={prevPage} nextPage={nextPage} />
          )}
          {currentPage === 3 && (
            <PageThree prevPage={prevPage} nextPage={nextPage} />
          )}
          {currentPage === 4 && <PageFour prevPage={prevPage} />}
        </ModalBody>
      </Modal>
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
    //console.log(result.data);
    dispatch(closeQuiz(result.data));
  }
});

Quiz = connect(
  null,
  mapDispatch
)(Quiz);
export default reduxForm({
  form: "quizzForm"
})(Quiz);
