import {Account} from "../../components/Account";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render } from "@testing-library/react";
import {Provider} from "react-redux";

test("<Account /> should render 'RESET PASSWORD'", () => {
  const store = {getState: () => {}, subscribe: () => {}}
  const user = {email: "mark@mark.com"}
  const testComponent = (
    <Provider store={store}>
      <Router>
        <Route render={( user ) => (
                <Account
                  user={user}
                />
        )} />
      </Router>
    </Provider>
  );

  const { getByText } = render(testComponent);
  expect(getByText("RESET PASSWORD")).toBeInTheDocument();
});