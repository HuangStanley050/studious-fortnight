import LoginForm from "../../components/LoginForm";
import React from "react";
import { BrowserRouter, Route, BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";

//mock data for test to run:
const item = { completed: true, courseId: 1, sessionDetail: {totalTime: 180} };

const store = {getState: () => {}, subscribe: () => {}, dispatch: () => {}}

test("<LoginForm /> should render 'Google'", () => {
  const testComponent = (
    <Provider store={store}>
      <BrowserRouter>  
          <Route render={() => (
                  <LoginForm
                    clearError={() => {}}
                  />)} 
          />
      </BrowserRouter>
    </Provider>
  );
  const { getByText } = render(testComponent);
  
  expect(getByText("Google")).toBeInTheDocument();
});