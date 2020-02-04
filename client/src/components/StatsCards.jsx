import React from "react";
import moment from "moment";

export const StatsCards = ({ usersStats }) => {
  return (
    <>
      {usersStats.map(stat => {
        return (
          <div
            data-testid="test-stats-card"
            className="stats-card"
            key={stat.id}
          >
            <p dangerouslySetInnerHTML={{ __html: stat.icon }}></p>
            <h2 className="title">{stat.title}</h2>
            <h2 className="stat">
              {stat.stat > 1000000 ? (
                <span>{moment(stat.stat).format("ll")}</span>
              ) : (
                <span>{stat.stat}</span>
              )}
              {stat.description}
            </h2>
          </div>
        );
      })}
    </>
  );
};

export default StatsCards;
