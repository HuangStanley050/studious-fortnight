import LoginForm from "../../components/LoginForm";
import React from "react";
import { BrowserRouter, Route, BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, getByTestId } from "@testing-library/react";
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

  const container = document.body
  const loginEmailInput = getByTestId(container, "email-input");

  expect(loginEmailInput).toBeInTheDocument();

  fireEvent.change(loginEmailInput, { target: { value: '23' } } );
  expect(loginEmailInput.value).toBe('23')

  const loginSubmit = getByTestId(container, "submit-input");
  expect(loginSubmit).toBeInTheDocument();
  fireEvent.click(loginSubmit)

  const loginPasswordInput = getByTestId(container, "password-input");
  fireEvent.change(loginPasswordInput, { target: { value: '23' } } );
  fireEvent.click(loginSubmit)

  expect(loginPasswordInput).toBeInTheDocument();
});