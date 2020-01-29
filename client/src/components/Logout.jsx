import React from "react";
import { logout } from "../store/actions/authActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Logout = ({ logOut, history }) => {
  const handleLogout = () => {
    if (window.confirm("Are you logging out?")) {
      logOut();
      history.push("/");
    }
    return;
  };
  return (
    <div className="account-update-section" onClick={handleLogout}>
      LOGOUT
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
