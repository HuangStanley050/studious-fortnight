import Payment from "../../components/PaymentForm.jsx";
import React from "react";
import { Account } from "../../components/Account";
import {
  BrowserRouter,
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

test("<Payment /> should render a Payment page through Stripe", () => {
  const testComponent = (
    <BrowserRouter>
      <Route component={Payment} />
    </BrowserRouter>
  );
  const { getByText, findByText, getByTestId } = render(testComponent);

  expect(getByText("Donate $5")).toBeInTheDocument();
});
