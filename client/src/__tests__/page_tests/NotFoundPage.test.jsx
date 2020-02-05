import NotFoundPage from "../../pages/NotFoundPage";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";

test("<NotFoundPage /> should render 'About CMCflow'", () => {
  const store = {getState: () => {}, subscribe: () => {}}
  const testComponent = (
    <Provider store={store}>
      <Router>
        <Route render={() => (
          <NotFoundPage
          />
        )} />
      </Router>
    </Provider>
  );

  const { getByText } = render(testComponent);
  expect(getByText("We are sorry, Page not found!")).toBeInTheDocument();
});