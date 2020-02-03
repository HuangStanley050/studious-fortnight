import Footer from "../../components/Footer";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { render } from "@testing-library/react";

test("<Footer /> should render 'contact and 'about'", () => {
  const testComponent = (
    <BrowserRouter>
      <Route component={Footer} />
    </BrowserRouter>
  );
  const { getByText } = render(testComponent);
  expect(getByText("About us")).toBeInTheDocument();
});