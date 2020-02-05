import { Home } from "../../pages/Home";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

const store = { getState: () => {}, subscribe: () => {}, dispatch: () => {} };
const meditationSession = {
  sessionDetail: { level: 1, totalTime: 180 }
};

test("<Home /> should render 'Level 1'", () => {
  const testComponent = (
    <Provider store={store}>
      <Router>
        <Route
          render={user => (
            <Home user={user} meditationSession={meditationSession} />
          )}
        />
      </Router>
    </Provider>
  );

  const { getByText } = render(testComponent);
  expect(getByText("Level 1")).toBeInTheDocument();
});

test("<Home /> should render 'Lets start your meditation session.'", () => {
  const testComponent = (
    <Provider store={store}>
      <Router>
        <Route
          render={user => (
            <Home user={user} meditationSession={meditationSession} />
          )}
        />
      </Router>
    </Provider>
  );

  const { getByText } = render(testComponent);
  const startButton = getByText("BEGIN");
  fireEvent.click(startButton);

  expect(getByText("Lets start your meditation session.")).toBeInTheDocument();
});
