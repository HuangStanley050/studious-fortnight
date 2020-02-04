import { NavBar } from "../../components/NavBar.jsx";
import Logout from "../../components/Logout.jsx";
import React from "react";
import { BrowserRouter, Route, Router, NavLink } from "react-router-dom";

import { render } from "@testing-library/react";



test("<Navbar /> should render 'Login'", () => {
  const testComponent = (
    
          <BrowserRouter>
                  <Route component={NavBar} />
          </BrowserRouter>
    
  );
  const { getByText, findByText, getByTestId } = render(testComponent);

  expect(getByTestId("NavbarLogin")).toBeInTheDocument();
});


