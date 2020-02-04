import Journey from "../../components/Journey";
import React from "react";
import { BrowserRouter, Route, BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";

// //mock data for test to run:
const journeyItems = [
  { completed: true, courseId: 1, sessionDetail: {totalTime: 180} },
  { completed: true, courseId: 2, sessionDetail: {totalTime: 180} }
]

test("<Journey /> test for course: should render '9 minutes meditated'", () => {
  const testComponent = (
    <BrowserRouter>  
        <Route render={() => (
                <Journey
                  journeyItems={journeyItems}
                  totalTimeMeditated={9}
                />)} 
        />
    </BrowserRouter>
  );
  const { getByText } = render(testComponent);
  
  expect(getByText("9 minutes meditated")).toBeInTheDocument();
});