import Loader from "../../components/Loader";
import React from "react";
import { BrowserRouter, Route, BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";

//mock data for test to run:
// const item = { completed: true, courseId: 1, sessionDetail: {totalTime: 180} };


test("<Loader /> test for course: should render 'Loading...'", () => {
  const testComponent = (
    <BrowserRouter>  
        <Route component={Loader} />
    </BrowserRouter>
  );
  const { getByText } = render(testComponent);
  
  expect(getByText("Loading...")).toBeInTheDocument();
});