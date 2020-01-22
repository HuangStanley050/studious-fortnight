import React, { useState } from "react";
import { Container } from "reactstrap";
import { reduxForm } from "redux-form";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";

const Quiz = props => {
  const [currentPage, setPage] = useState(1);

  const nextPage = () => setPage(currentPage + 1);
  const prevPage = () => setPage(currentPage - 1);
  return (
    <Container>
      <h1>starting quizz page</h1>
      {currentPage === 1 && <PageOne nextPage={nextPage} />}
      {currentPage === 2 && <PageTwo prevPage={prevPage} />}
    </Container>
  );
};

export default reduxForm({
  form: "quizzForm"
})(Quiz);
