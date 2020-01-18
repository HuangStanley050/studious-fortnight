import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("<App/> renders", () => {
  const { getByText } = render(<App />);

  expect(getByText("Hello world")).toBeInTheDocument();
});
