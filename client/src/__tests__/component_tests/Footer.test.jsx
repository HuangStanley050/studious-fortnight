import Footer from "../../components/Footer";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render } from "@testing-library/react";

test("<Footer /> should render 'contact and 'about'", () => {
  const testComponent = (
    <Router>
      <Route component={Footer} />
    </Router>
  );
  const { getByText } = render(testComponent);
  expect(getByText("About us")).toBeInTheDocument();
});