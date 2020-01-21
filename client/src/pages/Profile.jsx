import React, {useState} from 'react';
import ProfileNavBar from '../components/ProfileNavBar.jsx';
import './Profile.scss';

const Profile = () => {
  const [display, setDisplay] = useState("stats");

  const displayContent = (e) => {
    const setThis = e.currentTarget.getAttribute("value");
    setDisplay(setThis);
    // console.log(`clicked ${setThis}`);
  };

  return (
    <>
      <ProfileNavBar display={display} displayContent={displayContent} />
      <h1> </h1>
      <h1>{ (display === "stats") ? "Stats component" : null }</h1>
      <h1>{ (display === "journey") ? "Journey Component" : null }</h1>
      <h1>{ (display === "account") ? "Account Component" : null }</h1>
    </>
  )
}

export default Profile;