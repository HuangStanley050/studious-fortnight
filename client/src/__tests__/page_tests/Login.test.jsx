import Login from "../../pages/Login";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";

test("<Login /> should render 'Login'", () => {
  const store = {getState: () => {}, subscribe: () => {}}
  const testComponent = (
    <Provider store={store}>
      <Router>
        <Route render={() => (
                <Login
                />
        )} />
      </Router>
    </Provider>
  );

  const { getByText } = render(testComponent);
  expect(getByText("Login")).toBeInTheDocument();
});