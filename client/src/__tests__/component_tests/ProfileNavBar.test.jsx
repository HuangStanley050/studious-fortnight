import {ProfileNavBar} from "../../components/ProfileNavBar";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render } from "@testing-library/react";
import {Provider} from "react-redux";
import Profile from "../../pages/Profile";

test("<ProfileNavBar /> should render 'ACCOUNT, STATS, JOURNEY'", () => {

  const testComponent = (
        <ProfileNavBar />
  );
  
  const { getByText } = render(testComponent);

  expect(getByText("ACCOUNT")).toBeInTheDocument();
  expect(getByText("STATS")).toBeInTheDocument();
  expect(getByText("JOURNEY")).toBeInTheDocument();
});