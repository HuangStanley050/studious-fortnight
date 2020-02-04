import DeactivateAccount from "../../components/Footer";
import {Account} from "../../components/Account";
import React from "react";
import { BrowserRouter, Route, BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";

test("<DeactivateAccount /> should render 'DEACTIVATE ACCOUNT'", () => {
  const testComponent = (
    <BrowserRouter>
      <Route component={DeactivateAccount} />
    </BrowserRouter>
  );
  // testComponent.setState({modal: true})
  const { getByText } = render(testComponent);
  
  expect(getByText("About us")).toBeInTheDocument();
  expect(getByText("Contact")).toBeInTheDocument();
});


test("<DeactivateAccount /> should render 'Are you deactivating your account?' when modal is opened", () => {
  const store = {getState: () => {}, subscribe: () => {}}
  const user = {email: "mark@mark.com"}
  const testComponent = (
    <Provider store={store}>
      <Router>
        <Route render={( user ) => (
                <Account
                  user={user}
                >
                  <Route component={DeactivateAccount} />
                </Account>
        )} />
      </Router>
    </Provider>
  );

  const { getByText } = render(testComponent);
  expect(getByText("DEACTIVATE ACCOUNT")).toBeInTheDocument();

  const deactivateButton = getByText("DEACTIVATE ACCOUNT");
  fireEvent.click(deactivateButton);
  expect(getByText("Are you deactivating your account?")).toBeInTheDocument();
});