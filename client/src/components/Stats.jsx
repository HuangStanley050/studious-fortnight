import React from "react";
import StatsCards from "./StatsCards.jsx";
import "./Stats.scss";

export const Stats = ({
  totalTimeMeditated,
  runStreak,
  sessionsCompleted,
  badgesUnlocked,
  longestRunStreak,
  lastTimeMeditated
}) => {
  const usersStats = [
    {
      id: 1,
      stat: totalTimeMeditated,
      title: "Total Time Meditated",
      description: " minutes",
      icon: '<i class="far fa-clock"></i>'
    },
    {
      id: 2,
      stat: runStreak,
      title: "Current Run Streak",
      description: " sessions without missing a day",
      icon: '<i class="fas fa-network-wired"></i>'
    },
    {
      id: 3,
      stat: sessionsCompleted,
      title: "Sessions Completed",
      description: " sessions",
      icon: '<i class="fas fa-headphones-alt"></i>'
    },
    {
      id: 4,
      stat: badgesUnlocked,
      title: "Badges Unlocked",
      description: " badges",
      icon: '<i class="fas fa-certificate"></i>'
    },
    {
      id: 5,
      stat: longestRunStreak,
      title: "Longest Run Streak",
      description: " sessions without missing a day",
      icon: '<i class="fas fa-stream"></i>'
    },
    {
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
  );
};

export default Stats;
