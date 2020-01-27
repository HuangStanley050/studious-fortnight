import React, {useState, useEffect} from 'react';
import StatsCards from './StatsCards.jsx';
import axios from 'axios';
import API from "../api";
import "./Stats.scss";
import {currentRunStreakCalc, longestRunStreakCalc} from './statsLogic.js';

const Stats = () => {
  const [totalTimeMeditated, setTotalTimeMeditated] = useState(0);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [badgesUnlocked, setBadgesUnlocked] = useState(0);
  const [lastTimeMeditated, setLastTimeMeditated] = useState(0);
  const [runStreak, setRunStreak] = useState(0);
  const [longestRunStreak, setLongestRunStreak] = useState(0);

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
  }, [])

  const usersStats = [
    {
      id: 1,
      stat: totalTimeMeditated,
      title: "Total Time Meditated",
      description: " minutes",
      icon: '<i class="far fa-clock"></i>'
    }, {
      id: 2,
      stat: runStreak,
      title: "Current Run Streak",
      description: " sessions without missing a day",
      icon: '<i class="fas fa-network-wired"></i>'
    }, {
      id: 3,
      stat: sessionsCompleted,
      title: "Sessions Completed",
      description: " sessions",
      icon: '<i class="fas fa-headphones-alt"></i>'
    }, {
      id: 4,
      stat: badgesUnlocked, 
      title: "Badges Unlocked",
      description: " badges",
      icon: '<i class="fas fa-certificate"></i>'
    }, {
      id: 5,
      stat: longestRunStreak,
      title: "Longest Run Streak",
      description: " sessions without missing a day",
      icon: '<i class="fas fa-stream"></i>'
    }, {
      id: 6,
      stat: lastTimeMeditated,
      title: "Last Time Meditated",
      description: "",
      icon: '<i class="fas fa-stopwatch"></i>'
    }
  ];

  return (
    <>
      <div className="stats-content">
        <StatsCards usersStats={usersStats} />
      </div>
    </>
  )
};

export default Stats;