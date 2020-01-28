import React from 'react';
import {Link} from 'react-router-dom';
import UpdateEmailForm from './UpdateEmailForm.jsx';
import './Account.scss';

const Account = ({user}) => {

  return (
    <div className="account-body">
      {/* new email form */}
      <UpdateEmailForm user={user} /><br />
      {/* new password button */}

      <div className="account-update-section">
        <Link to="/password_recovery" className="link">RESET PASSWORD</Link>
      </div>
      {/* placeholder data */}
      <div className="account-update-section">LOGOUT</div>
      <div className="account-update-section">DELETE ACCOUNT</div>
    </div>
  )
}

export default Account;