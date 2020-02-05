import Profile from "../../pages/Profile";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";


//also test if its not just loading? 

test("<Profile /> should render 'About CMCflow'", () => {
  const store = {getState: () => {}, subscribe: () => {}}
  const testComponent = (
    <Provider store={store}>
      <Router>
        <Route render={() => (
                <Profile
                />
        )} />
      </Router>
    </Provider>
  );

  const { getByText } = render(testComponent);
  expect(getByText("Loading...")).toBeInTheDocument();
});