import React, { useState } from "react";
import { logout } from "../store/actions/authActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import API from "../api";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const DeactivateAccount = ({ logOut, history, setLoading }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const handleDeactivate = async () => {
    const token = localStorage.getItem("CMCFlow");
    //turn loading screen on
    setLoading(true);
    const response = await axios({
      headers: { Authorization: `bearer ${token}` },
      method: "post",
      url: API.deactivateAccount
    });
    setLoading(false);
    if (response.data.activeUser === false) {
      window.alert("Successfully deactivated account.");
    }

    logOut();
    setModal(!modal);
    history.push("/");

    return;
  };
  return (
    <div className="account-update-section" onClick={toggle}>
      DEACTIVATE ACCOUNT
      <Modal isOpen={modal}>
        <ModalHeader toggle={toggle}>
          Are you deactivating your account?
        </ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </ModalBody>
        <ModalFooter>
          <Button className="confirm-button" onClick={handleDeactivate}>
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
  )(DeactivateAccount)
);
