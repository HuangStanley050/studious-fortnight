import React, { useState } from "react";
import { logout } from "../store/actions/authActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Logout.css";

export const Logout = ({ logOut, history }) => {
  const handleLogout = () => {
    //if (window.confirm("Are you logging out?")) {
    logOut();
    setModal(!modal);
    history.push("/");
    //}
    return;
  };
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div data-testid="Logout-Test" className="account-update-section" onClick={toggle}>
      LOGOUT
      <Modal data-testid="Logout-Modal" isOpen={modal}>
        <ModalHeader toggle={toggle}>Are you logging out?</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </ModalBody>
        <ModalFooter>
          <Button className="confirm-button" onClick={handleLogout}>
            Yes
          </Button>{" "}
          <Button className="cancel-button" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapDispatch = dispatch => ({
  logOut: () => dispatch(logout())
});
export default withRouter(
  connect(
    null,
    mapDispatch
  )(Logout)
);

/*<div className="account-update-section" onClick={handleLogout}>
  LOGOUT
</div>*/
