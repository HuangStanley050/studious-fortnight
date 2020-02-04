import About from "../../pages/About";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";

test("<About /> should render 'About CMCflow'", () => {
  const store = {getState: () => {}, subscribe: () => {}}
  const testComponent = (
    <Provider store={store}>
      <Router>
        <Route render={() => (
                <About
                />
        )} />
      </Router>
    </Provider>
  );

  const { getByText } = render(testComponent);
  expect(getByText("About CMCflow")).toBeInTheDocument();
});