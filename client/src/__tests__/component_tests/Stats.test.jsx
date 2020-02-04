import React from "react";
import { Stats } from "../../components/Stats";
import { StatsCards } from "../../components/StatsCards";
import { render } from "@testing-library/react";

test("<Stats/> page should have an array of six elements for userStats", () => {
  const requiredProps = {
    totalTimeMeditated: null,
    runStreak: null,
    sessionsCompleted: null,
    badgesUnlocked: null,
    longestRunStreak: null,
    lastTimeMeditated: null
  };
  const userStats = [1, 2, 3, 4, 5, 6];
  const { getAllByTestId } = render(
    <Stats {...requiredProps}>
      <StatsCards userStats={userStats} />
    </Stats>
  );
  const statsCard = getAllByTestId("test-stats-card");
  //expect(statsCard).toBeInTheDocument();
  for (let counter in userStats) {
    expect(statsCard[counter]).toBeInTheDocument();
  }
  //console.log(statsCard);
});
