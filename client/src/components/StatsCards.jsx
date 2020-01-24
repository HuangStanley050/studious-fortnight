import React from 'react';

const StatsCards = ({usersStats}) => {

  return (
    <>
    {usersStats.map((stat) => {
      return (
        <div className="stats-card" key={stat.id}>
          <p dangerouslySetInnerHTML={{__html: stat.icon}}></p>
          <h2 className="title">{stat.title}</h2>
          <h2 className="stat">{stat.stat} {stat.description}</h2>
        </div>
      )
    })}
    </>
  )
}

export default StatsCards;