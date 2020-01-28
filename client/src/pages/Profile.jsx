import React, {useState, useEffect} from 'react';
import ProfileNavBar from '../components/ProfileNavBar.jsx';
import Stats from '../components/Stats.jsx';
import Journey from '../components/Journey.jsx';
import './Profile.scss';
import {currentRunStreakCalc, longestRunStreakCalc} from '../components/statsLogic.js';
import axios from 'axios';
import API from "../api";
import Account from "../components/Account.jsx"

const Profile = () => {
  const [display, setDisplay] = useState("stats");

  const displayContent = (e) => {
    const setThis = e.currentTarget.getAttribute("value");
    setDisplay(setThis);
    // console.log(`clicked ${setThis}`);
  };

  //======================

  const [totalTimeMeditated, setTotalTimeMeditated] = useState(0);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [badgesUnlocked, setBadgesUnlocked] = useState(0);
  const [lastTimeMeditated, setLastTimeMeditated] = useState(0);
  const [runStreak, setRunStreak] = useState(0);
  const [longestRunStreak, setLongestRunStreak] = useState(0);
  const [journeyItems, setJourneyItems] = useState(0);
  const [user, setUser] = useState(0);

  useEffect(() => {
   //api call: API.meditationData
    //get all meditations: 
    const getMeditations = async () => {
      const token = localStorage.getItem("CMCFlow");
      const response = await axios({
        headers: { Authorization: `bearer ${token}` },
        method: "get",
        url: API.meditationData
      }); 

      //logic to work out total time meditated and set it
      let totalTime = 0;
      response.data.forEach((meditation) => {
        if(meditation.completed == true) {
          totalTime += meditation.sessionDetail.totalTime;
        }
      });
      //convert seconds to minutes and round:
      totalTime = Math.round(totalTime / 60)
      setTotalTimeMeditated(totalTime);

      //logic to work out sessions completed and set it
      let completedSessions = 0;
      response.data.forEach((meditation) => {
        if(meditation.completed == true) {
          completedSessions++;
        }
      });
      setSessionsCompleted(completedSessions);

      //logic to work out last time meditated
      let theLastTimeMeditated = 0;
      response.data.forEach((meditation) => {
        if(Date.parse(meditation.updatedAt) > theLastTimeMeditated) {
          theLastTimeMeditated = Date.parse(meditation.updatedAt);
        }
      });
      setLastTimeMeditated(theLastTimeMeditated);

      //logic to work out longest runstreak
      longestRunStreakCalc(response, setLongestRunStreak);

      //logic to work out current runstreak 
      currentRunStreakCalc(response, setRunStreak);
    }
    getMeditations();

    const getBadgesUnlocked = async () => {
      const token = localStorage.getItem("CMCFlow");
      const response = await axios({
        headers: { Authorization: `bearer ${token}` },
        method: "get",
        url: API.badgeData
      })
      let unlockedBadges = 0;
      response.data.forEach((badge) => {
        if(badge.unlocked == true) {
          unlockedBadges++;
        }
      }); 
      setBadgesUnlocked(unlockedBadges);
    }
    getBadgesUnlocked();

    const getJourneyItems = async () => {
      const token = localStorage.getItem("CMCFlow");
      const response = await axios({
        headers: { Authorization: `bearer ${token}` },
        method: "get",
        url: API.meditationData
      })
      let theJourneyItems = [];
      response.data.forEach((meditation) => {
        if(meditation.completed === false) {
          theJourneyItems.push(meditation);
        }
      })
      setJourneyItems(theJourneyItems)
    }
    getJourneyItems();

    const setTheUser = async () => {
      const token = localStorage.getItem("CMCFlow");
      const response = await axios({
        headers: { Authorization: `bearer ${token}` },
        method: "get",
        url: API.getUser
      })
      setUser(response.data)
    }
    setTheUser()

  }, [])



  return (
    <>
      <ProfileNavBar display={display} displayContent={displayContent} />
      <h1> </h1>
      <h1>{ (display === "stats") ? 
          <Stats
            totalTimeMeditated={totalTimeMeditated}
            runStreak={runStreak}
            sessionsCompleted={sessionsCompleted}
            badgesUnlocked={badgesUnlocked}
            longestRunStreak={longestRunStreak}
            lastTimeMeditated={lastTimeMeditated}
          /> 
          : null }
      </h1>
      <div>{ (display === "journey") ? 
          <Journey 
            totalTimeMeditated={totalTimeMeditated}
            journeyItems={journeyItems}
          /> 
          : null }
      </div>
      <div>{ (display === "account") ? 
          <Account 
            user={user}
          />
          : null }
      </div>
    </>
  )
}

export default Profile;