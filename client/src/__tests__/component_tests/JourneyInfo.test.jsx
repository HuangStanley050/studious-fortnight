import JourneyInfo from "../../components/JourneyInfo";
import React from "react";
import { BrowserRouter, Route, BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";

//mock data for test to run:
const item = { completed: true, courseId: 1, sessionDetail: {totalTime: 180} };


test("<JourneyInfo /> test for course: should render 'Beginner'", () => {
  const testComponent = (
    <BrowserRouter>  
        <Route render={() => (
                <JourneyInfo
                  item={item}
                  totalTimeMeditated={9}
                />)} 
        />
    </BrowserRouter>
  );
  const { getByText } = render(testComponent);
  
  expect(getByText("Beginner")).toBeInTheDocument();
});