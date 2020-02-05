import JourneyInfo from "../../components/JourneyInfo";
import React from "react";
import { BrowserRouter, Route, BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";

//mock data for test to run:
const item = { completed: true, courseId: 1, sessionDetail: {totalTime: 180} };
const item2 = { completed: true, courseId: 1, sessionDetail: {totalTime: 300} };
const item3 = { completed: true, courseId: 1, sessionDetail: {totalTime: 600} };
const item4 = { completed: true, courseId: 1, sessionDetail: {totalTime: 0} };

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

test("<JourneyInfo /> test for course: should render 'Intermediate'", () => {
  const testComponent = (
    <BrowserRouter>  
        <Route render={() => (
          <JourneyInfo
            item={item2}
            totalTimeMeditated={9}
          />)} 
        />
    </BrowserRouter>
  );
  const { getByText } = render(testComponent);
  
  expect(getByText("Intermediate")).toBeInTheDocument();
});

test("<JourneyInfo /> test for course: should render 'Expert'", () => {
  const testComponent = (
    <BrowserRouter>  
        <Route render={() => (
          <JourneyInfo
            item={item3}
            totalTimeMeditated={9}
          />)} 
        />
    </BrowserRouter>
  );
  const { getByText } = render(testComponent);
  
  expect(getByText("Expert")).toBeInTheDocument();
});

test("<JourneyInfo /> test for course: should render 'Beginner'", () => {
  const testComponent = (
    <BrowserRouter>  
        <Route render={() => (
          <JourneyInfo
            item={item4}
            totalTimeMeditated={9}
          />)} 
        />
    </BrowserRouter>
  );
  const { getByText } = render(testComponent);
  
  expect(getByText("Unsure")).toBeInTheDocument();
});