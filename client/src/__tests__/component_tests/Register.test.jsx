import React from "react";
import { Register } from "../../components/Register";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

test("<Register/> should display email and password on the form", () => {
  const requiredProps = {
    register: null,
    error: null,
    clearError: () => {},
    toggle: null,
    loginOrRegister: null,
    hasRegistered: null,
    isAuth: null
  };
  const store = { getState: () => {}, subscribe: () => {}, dispatch: () => {} };
  const { getByText, getAllByText } = render(
    <Provider store={store}>
      <Register {...requiredProps} />
      );
    </Provider>
  );

  expect(getByText("Email")).toBeInTheDocument();
  expect(getAllByText("Password")[0]).toBeInTheDocument();
  expect(getAllByText("Password")[1]).toBeInTheDocument();
});
