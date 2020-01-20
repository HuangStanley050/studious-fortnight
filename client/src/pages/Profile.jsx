import React, {useState} from 'react';
// import ProfileNavBar from '../components/ProfileNavBar.jsx';

const Profile = () => {
  const [display, setDisplay] = useState("stats");

  const displayContent = (e) => {
    const setThis = e.currentTarget.getAttribute("value");
    setDisplay(setThis);
    // console.log(`clicked ${setThis}`);
  };

  return (
    <>
      <span onClick={displayContent} value="stats">STATS</span> &nbsp;
      <span onClick={displayContent} value="journey">JOURNEY</span> &nbsp;
      <span onClick={displayContent} value="account">ACCOUNT</span>

      <h1>{ (display === "stats") ? "Stats component" : null }</h1>
      <h1>{ (display === "journey") ? "Journey Component" : null }</h1>
      <h1>{ (display === "account") ? "Account Component" : null }</h1>
    </>
  )
}

export default Profile;