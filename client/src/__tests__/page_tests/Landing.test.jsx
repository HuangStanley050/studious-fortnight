import {Landing} from "../../pages/Landing";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";

test("<Landing /> should render 'Your guide to metal clarity'", () => {
  const store = {getState: () => {}, subscribe: () => {}}
  const testComponent = (
    <Provider store={store}>
      <Router>
        <Route render={() => (
                <Landing
                />
        )} />
      </Router>
    </Provider>
  );

  const { getByText } = render(testComponent);
  expect(getByText("Your guide to metal clarity")).toBeInTheDocument();
});