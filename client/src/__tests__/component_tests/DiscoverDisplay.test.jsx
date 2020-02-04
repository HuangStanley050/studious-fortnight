import DiscoverDisplay from "../../components/DiscoverDisplay";
import React from "react";
import { BrowserRouter, Route, BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";

// //mock data for test to run:
const usersMeditations = [
  { completed: true, courseId: 1 },
  { completed: true, courseId: 2}
]
const activeCourse = { completed: true, courseId: 1 }
const activeBadge = {id: 1, name: "Journey Starter", unlocked: true, description: "Well done on starting your journey!", image_url: "link.png"}

test("<DiscoverDisplay /> test for course: should render 'Course started'", () => {
  const testComponent = (
    <BrowserRouter>  
        <Route render={() => (
                <DiscoverDisplay
                  usersMeditations={usersMeditations}
                  activeCourse={activeCourse}
                  currentlyShowing={"courses"}
                />)} 
        />
    </BrowserRouter>
  );
  const { getByText } = render(testComponent);
  
  expect(getByText("Course started")).toBeInTheDocument();
});

test("<DiscoverDisplay /> test for badge: should render 'Journey Starter'", () => {
  const testComponent = (
    <BrowserRouter>  
        <Route render={() => (
                <DiscoverDisplay
                  usersMeditations={usersMeditations}
                  activeCourse={activeCourse}
                  activeBadge={activeBadge}
                  currentlyShowing={"badges"}
                />)} 
        />
    </BrowserRouter>
  );
  const { getByText } = render(testComponent);
  
  expect(getByText("Journey Starter")).toBeInTheDocument();
});