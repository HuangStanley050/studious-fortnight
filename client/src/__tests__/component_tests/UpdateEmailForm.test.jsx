import React from "react";
import { render, fireEvent } from "@testing-library/react";

import UpdateEmailForm from "../../components/UpdateEmailForm";

test("<UpdateEmailForm/> displays 'Update'", () => {
  const user = {
    email: "nothing"
  };
  const { getByText } = render(<UpdateEmailForm user={user} />);
  expect(getByText("UPDATE")).toBeInTheDocument();
});
