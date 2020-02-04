import {Login} from "../../components/Login";
import React from "react";
import { BrowserRouter, Route, BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";

//mock data for test to run:
const item = { completed: true, courseId: 1, sessionDetail: {totalTime: 180} };

const store = {getState: () => {}, subscribe: () => {}, dispatch: () => {}}

test("<Login /> should render 'Email'", () => {
  const testComponent = (
    <Provider store={store}>
      <BrowserRouter>  
          <Route render={() => (
                  <Login
                    clearError={() => {}}
                  />)} 
          />
      </BrowserRouter>
    </Provider>
  );
  const { getByText } = render(testComponent);
  
  expect(getByText("Email")).toBeInTheDocument();
});