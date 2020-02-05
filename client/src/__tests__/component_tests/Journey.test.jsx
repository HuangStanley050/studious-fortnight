import Journey from "../../components/Journey";
import React from "react";
import { BrowserRouter, Route, BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, getAllByTestId } from "@testing-library/react";

// //mock data for test to run:
const journeyItems = [
  { completed: true, courseId: 1, sessionDetail: {totalTime: 180} },
  { completed: true, courseId: 2, sessionDetail: {totalTime: 180} }
]

const journeyItems2 = [
  { completed: true, courseId: 1, sessionDetail: {totalTime: 300} },
  { completed: true, courseId: 2, sessionDetail: {totalTime: 300} }
]

const journeyItems3 = [
  { completed: true, courseId: 1, sessionDetail: {totalTime: 600, level: "1", quote: "blah", currentTime: 0}, _id: 1 },
  { completed: true, courseId: 2, sessionDetail: {totalTime: 600, level: "2", quote: "blah", currentTime: 0}, _id: 2 }
]

test("<Journey /> test for course: should render 'Intermediate'", () => {
  const testComponent = (
    <BrowserRouter>  
        <Route render={() => (
                <Journey
                  journeyItems={journeyItems}
                  totalTimeMeditated={6}
                />)} 
        />
    </BrowserRouter>
  );
  const { getByText } = render(testComponent);
  
  expect(getByText("6 minutes meditated")).toBeInTheDocument();
});

test("<Journey /> test for course: should render '8 minutes meditated'", () => {
  const testComponent = (
    <BrowserRouter>  
        <Route render={() => (
                <Journey
                  journeyItems={journeyItems2}
                  totalTimeMeditated={8}
                />)} 
        />
    </BrowserRouter>
  );
  const { getByText } = render(testComponent);
  
  expect(getByText("8 minutes meditated")).toBeInTheDocument();
});

test("<Journey /> test for course: should render '10 minutes meditated'", () => {
  const testComponent = (
    <BrowserRouter>  
        <Route render={() => (
                <Journey
                  journeyItems={journeyItems3}
                  totalTimeMeditated={10}
                />)} 
        />
    </BrowserRouter>
  );
  const { getByText } = render(testComponent);
  
  expect(getByText("10 minutes meditated")).toBeInTheDocument();
});

test("<Journey /> test for course: popup info", () => {
  const testComponent = (
    <BrowserRouter>  
        <Route render={() => (
                <Journey
                  journeyItems={journeyItems3}
                  totalTimeMeditated={10}
                />)} 
        />
    </BrowserRouter>
  );
  const { getByText } = render(testComponent);

  const container = document.body
  const journeyItemButton = getAllByTestId(container, "journey-item");
  // console.log(journeyItemButton[0]);
  // console.log("============================")
  expect(journeyItemButton[0]).toBeInTheDocument();
  
  // fireEvent.click(journeyItemButton[1]);
  // expect(getByText("kljljk")).toBeInTheDocument();

  // expect(getByText("X")).toBeInTheDocument();
});