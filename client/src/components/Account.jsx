import React, { useState } from "react";
import { Link } from "react-router-dom";
import UpdateEmailForm from "./UpdateEmailForm.jsx";
import "./Account.scss";
import Logout from "../components/Logout";
import PaymentForm from "../components/PaymentForm";
import axios from "axios";
import API from "../api";
import Loader from "../components/Loader";
import DeactivateAccount from "../components/DeactivateAccount";
import { withRouter } from "react-router-dom";
import { logout } from "../store/actions/authActions";
import { connect } from "react-redux";

export const Account = ({ user, history, logOut }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="account-body">
      {loading ? (
        <Loader />
      ) : (
        <>
          <UpdateEmailForm user={user} />
          <br />
          <div className="account-update-section">
            <Link to="/password_recovery" className="link">
              RESET PASSWORD
            </Link>
          </div>
          <Logout />
          {/*<div
            className="account-update-section"
            onClick={deactivateAccountFunc}
          >
            DELETE ACCOUNT
          </div>*/}
          <DeactivateAccount setLoading={setLoading} />
          <PaymentForm />
        </>
      )}
    </div>
  );
};

// export default Account;

const mapDispatch = dispatch => ({
  logOut: () => dispatch(logout())
});
export default withRouter(
  connect(
    null,
    mapDispatch
  )(Account)
);
