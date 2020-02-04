import PasswordReset from "../../pages/PasswordReset";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";

test("<PasswordReset /> should render 'Password reset form'", () => {
  const store = {getState: () => {}, subscribe: () => {}}
  const testComponent = (
    <Provider store={store}>
      <Router>
        <Route render={() => (
                <PasswordReset
                  userId={"5e38f267af8f647eb32fc57e"}
                  token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1fYXJjaEBvdXRsb29rLmNvbS5hdSIsImlkIjoiNWUzODlkZmY3OTVmMTkyMWZmNGQ5MDQxIiwiaWF0IjoxNTgwNzg1NTEyLCJleHAiOjE1ODA3ODkxMTJ9.n3i9G8rPdCwr1g9xg0WLIXzwUqtDechIJVBfc81mRJY"}
                />
        )} />
      </Router>
    </Provider>
  );

  const { getByText } = render(testComponent);
  expect(getByText("Password reset form")).toBeInTheDocument();
});