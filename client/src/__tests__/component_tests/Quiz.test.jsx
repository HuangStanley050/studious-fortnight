import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { Quiz } from "../../components/Quiz";

test("<Quiz/> should should render a quiz page", () => {
  const hasRegistered = true;
  const store = { getState: () => {}, subscribe: () => {}, dispatch: () => {} };
  const turnOffQuiz = () => {};
  const { getByTestId } = render(
    <Provider store={store}>
      <Quiz hasRegistered={hasRegistered} turnOffQuiz={turnOffQuiz} />
    </Provider>
  );
  const quizModal = getByTestId("quiz-modal");

  expect(quizModal).toBeInTheDocument();
});
