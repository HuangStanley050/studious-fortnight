import React from "react";
import { render } from "@testing-library/react";
import { StatsCards } from "../../components/StatsCards";

test("<StatsCards /> should contains a <p/> of icon and two <h2/> of stat and description", () => {
  const usersStats = [
    {
      id: "1",
      title: "title",
      stats: "stats",
      description: "description",
      icon: "stuff"
    }
  ];
  const { getByTestId } = render(<StatsCards usersStats={usersStats} />);

  expect(getByTestId("test-stats-card")).toBeInTheDocument();
});
