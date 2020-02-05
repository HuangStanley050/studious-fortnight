import {Login} from "../../components/Login";
import React from "react";
import { BrowserRouter, Route, BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, getByTestId } from "@testing-library/react";
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

test("<Login /> should render Alert", () => {
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

  global.alert = jest.fn();
  const container = document.body
  const loginButton = getByTestId(container, "login-button");

  expect(loginButton).toBeInTheDocument();
  fireEvent.click(loginButton);

  //see that alert has beeb called from clicking login button
  expect(global.alert).toHaveBeenCalledTimes(1);
});


test("<Login /> with facebook should cause no errors", () => {
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

  // global.alert = jest.fn();
  const container = document.body
  const loginButton = getByTestId(container, "facebook-button");

  expect(loginButton).toBeInTheDocument();
  fireEvent.click(loginButton);

  expect(getByText("Login with Facebook")).toBeInTheDocument();
});


test("<Login /> with google should cause no errors", () => {
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

  // global.alert = jest.fn();
  const container = document.body
  const loginButton = getByTestId(container, "google-button");

  expect(loginButton).toBeInTheDocument();
  fireEvent.click(loginButton);

  expect(getByText("Login with Google")).toBeInTheDocument();
});

test("<Login /> forgotten password", () => {
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

  // global.alert = jest.fn();
  const container = document.body
  const loginButton = getByTestId(container, "forgot-button");

  expect(loginButton).toBeInTheDocument();
  fireEvent.click(loginButton);

  expect(getByText("Forgot password?")).toBeInTheDocument();
});