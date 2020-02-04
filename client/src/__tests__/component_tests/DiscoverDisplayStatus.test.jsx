import DiscoverDisplayStatus from "../../components/DiscoverDisplayStatus";
import React from "react";
import { BrowserRouter, Route, BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";

// //mock data for test to run:
const activeCourse = { completed: true, courseId: 1, totalLessons: 3 }
const activeCourse2 = { completed: false, courseId: "", totalLessons: 3 }
const activeCourse3 = { completed: false, courseId: "", totalLessons: 3 }
const completedLessons = 3;

test("<DiscoverDisplayStatus /> test for course: should render 'Course started'", () => {
  const testComponent = (
    <BrowserRouter>  
        <Route render={() => (
                <DiscoverDisplayStatus
                  activeCourse={activeCourse}
                />)} 
        />
    </BrowserRouter>
  );
  const { getByText } = render(testComponent);
  
  expect(getByText("Course started")).toBeInTheDocument();
});

test("<DiscoverDisplayStatus /> test for course: should render 'Course not started'", () => {
  const testComponent = (
    <BrowserRouter>  
        <Route render={() => (
                <DiscoverDisplayStatus
                  activeCourse={activeCourse2}
                />)} 
        />
    </BrowserRouter>
  );
  const { getByText } = render(testComponent);
  
  expect(getByText("Course not started")).toBeInTheDocument();
});

test("<DiscoverDisplayStatus /> test for course: should render 'Course finished'", () => {
  const testComponent = (
    <BrowserRouter>  
        <Route render={() => (
                <DiscoverDisplayStatus
                  activeCourse={activeCourse3}
                  completedLessons={completedLessons}
                />)} 
        />
    </BrowserRouter>
  );
  const { getByText } = render(testComponent);
  
  expect(getByText("Course finished")).toBeInTheDocument();
});