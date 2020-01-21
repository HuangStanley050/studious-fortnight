import React from 'react';

const ProfileNavBar = (props) => {
  return (
    <div className="profile-navbar">
        <div className="link-div">
          <span className={(props.display === "stats" ? "selected-link" : "link" )} onClick={props.displayContent} value="stats">
            STATS
          </span>
          <div className={ (props.display === "stats" ? "hover-box" : "normal-box" )}></div>
        </div>

        <div className="link-div">
          <span className={(props.display === "journey" ? "selected-link" : "link" )} onClick={props.displayContent} value="journey">
            JOURNEY
          </span>
          <div className={ (props.display === "journey" ? "hover-box" : "normal-box" )}></div>
        </div>

        <div className="link-div">
          <span className={(props.display === "account" ? "selected-link" : "link" )} onClick={props.displayContent} value="account">
            ACCOUNT
          </span>
          <div className={ (props.display === "account" ? "hover-box" : "normal-box" )}></div>
        </div>
      </div>
  )
}

export default ProfileNavBar;