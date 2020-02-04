// import { Logout } from "../../components/Logout.jsx";
import Logout from "../../components/Logout.jsx";
// import Logout from "../../components/Footer";
// import { logout } from "../store/actions/authActions";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import React from "react";
import {Account} from "../../components/Account";
import { BrowserRouter, Route, BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";



test("<Logout /> should render LOGOUT to the screen", () => {
    const store = {getState: () => {}, subscribe: () => {}}
    const user = {email: "mark@mark.com"}
    const testComponent = (
        <Provider store={store}>
            <Router>
                    <Route component={Logout} />
            </Router>
      </Provider>
    );
    const { getByText, findByText, getByTestId } = render(testComponent);
    const LogoutButton = getByTestId("Logout-Test")
    // const Modal = getByTestId("Logout-Modal")
    // console.log(LogoutButton)


    expect(LogoutButton).toBeInTheDocument();
    
});


// <button>Logout</button>
test("<Logout /> should render 'Are you logging out?' when modal (class of 'modal-title') is opened", () => {
    const store = {getState: () => {}, subscribe: () => {}}
const user = {email: "mark@mark.com"}
    const testComponent = (
      <Provider store={store}>
        <Router>
          <Route render={( user ) => (
                  <Account
                    user={user}
                  >
                    <Route component={Logout} />
                  </Account>
          )} />
        </Router>
      </Provider>
    );

    const { getByText, getByTestId } = render(testComponent);
    const LogoutButton = getByTestId("Logout-Test")
  
    fireEvent.click(LogoutButton);
    expect(getByText("Are you logging out?")).toBeInTheDocument();

});