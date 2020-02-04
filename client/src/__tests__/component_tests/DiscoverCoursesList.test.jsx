import DiscoverCoursesList from "../../components/DiscoverCoursesList";
import React from "react";
import { BrowserRouter, Route, BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";

// //mock data for test to run:
import courses from "../../dummyData/courses.js";
const activeCourse =   {
  id: "1",
  name: "Beginner",
  duration: "3 minutes",
  totalLessons: "3",
  image_url:
    "https://cdn.mindful.org/how-to-meditate.jpg?q=80&fm=jpg&fit=crop&w=1920&h=1080",
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio culpa inventore aperiam reiciendis? Mollitia minima aspernatur voluptatum aut sunt. Iste, rem. Architecto aspernatur, voluptates accusantium officiis deserunt velit ut quas rerum iste odio! Deserunt nam provident quidem voluptate odio labore quia, ex nesciunt magnam nemo itaque reprehenderit distinctio aliquam!",
  courseId: ""
}

test("<DiscoverCoursesList /> should render 'Beginner'", () => {
  const testComponent = (
    <BrowserRouter>  
        <Route render={( user ) => (
                <DiscoverCoursesList
                  courses={courses}
                  activeCourse={activeCourse}
                />)} 
        />
    </BrowserRouter>
  );
  const { getByText } = render(testComponent);
  
  expect(getByText("Beginner")).toBeInTheDocument();
});